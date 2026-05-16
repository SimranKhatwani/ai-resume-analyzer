import Navbar from "~/components/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router";
import FileUploader from "~/components/FileUploader";
import { generateUUID } from "~/lib/format";
import { convertPdfToImage } from "~/lib/pdf2img";
import { prepareInstructions } from "~/constants";
import { usePuterStore } from "~/lib/puter";

const Upload = () => {
  const navigate = useNavigate();
  const { auth, isLoading, fs, ai, kv } = usePuterStore();

  const [isProcessing, setIsProcessing] = useState(true);
  const [statusTest, setStatusTest] = useState("Preparing your upload...");
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };

  const handleAnalyze = async ({
    companyName,
    jobTitle,
    jobDescription,
    file,
  }: {
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    file: File;
  }) => {
    setIsProcessing(true);
    setStatusTest("Uploading your resume...");

    const uploadFile = await fs.upload([file]);
    if (!uploadFile) {
      setStatusTest("Error: Failed to upload your resume. Please try again.");
      return;
    }

    setStatusTest("Converting to image...");
    const imageFile = await convertPdfToImage(file);
    if (!imageFile || !imageFile.file) {
      setStatusTest("Error: Failed to convert your PDF to image. Please try again.");
      return;
    }

    setStatusTest("Uploading the image...");
    const uploadImage = await fs.upload([imageFile.file]);
    if (!uploadImage) {
      setStatusTest("Error: Failed to upload the image. Please try again.");
      return;
    }

    setStatusTest("Preparing data...");

    const uuid = generateUUID();
    const data = {
      id: uuid,
      resumePath: uploadFile.path,
      imagePath: uploadImage.path,
      companyName,
      jobTitle,
      jobDescription,
      feedback: "",
    };

    await kv.set(`resume:${uuid}`, JSON.stringify(data));

    setStatusTest("Analyzing ...");

   const feedback = await ai.feedback(
  uploadFile.path,
  prepareInstructions({
    jobTitle,
    jobDescription,
    AIResponseFormat: "JSON",
  })
);
    ;

    if (!feedback) {
      setStatusTest("Error: Failed to analyze your resume. Please try again.");
      return;
    }

    const feedbackText =
      typeof feedback?.message?.content === "string"
        ? feedback.message.content
        : feedback?.message?.content?.[0]?.text || "";

    try {
      data.feedback = JSON.parse(feedbackText);
    } catch {
      data.feedback = feedbackText;
    }

    await kv.set(`resume:${uuid}`, JSON.stringify(data));
    setStatusTest("Analysis complete! Redirecting...");
    console.log(data);
    navigate(`/resume/${uuid}`);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const companyName = (formData.get("company-name") as string) || "";
    const jobTitle = (formData.get("job-title") as string) || "";
    const jobDescription = (formData.get("job-description") as string) || "";

    if (!file) {
      setStatusTest("Please select a file before submitting.");
      return;
    }

    handleAnalyze({ companyName, jobTitle, jobDescription, file });
  };

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen">
      <Navbar />

      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Smart Feedback For Your Dream Job</h1>
          <h2>Drop your resumes for an ATS score and improvement tips.</h2>
          {isProcessing ? (
            <>
              <h2>{statusTest}</h2>
              <img
                src="/images/resume-scan.gif"
                alt="Resume scanning"
                className="w-full"
              />
            </>
          ) : (
            <h2>Drop your resumes for an ATS score and improvement tips.</h2>
          )}
          {isProcessing && (
            <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="form-div">
                <label htmlFor="company-name">Company Name</label>
                <input
                  type="text"
                  name="company-name"
                  placeholder="Enter the company name"
                  id="company-name"
                />
              </div>

              <div className="form-div">
                <label htmlFor="job-title">Job Title</label>
                <input
                  type="text"
                  name="job-title"
                  placeholder="Enter the job title"
                  id="job-title"
                />
              </div>

              <div className="form-div">
                <label htmlFor="job-description">Job Description</label>
                <input
                  type="text"
                  name="job-description"
                  placeholder="Enter the job description"
                  id="job-description"
                />
              </div>

              <div className="form-div">
                <label htmlFor="uploader">Upload Resume</label>
                <FileUploader onFileSelect={handleFileSelect} />
              </div>

              <button className="primary-button" type="submit">
                Analyze Resume
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default Upload;
