import { Link } from 'react-router'
import ScoreCircle from './ScoreCircle'
import { useEffect, useState } from 'react'
import { usePuterStore } from '~/lib/puter'


const ResumeCard = ({
  resume: { id, companyName, jobTitle, feedback, imagePath },
}: {
  resume: Resume;
}) => {
  const { fs } = usePuterStore();

  const [resumeUrl, setResumeUrl] = useState('');
  

useEffect(() => {
    const loadResume = async () => {
      const blob: any = await fs.read(imagePath);
      if (!blob) return;
      let url = URL.createObjectURL(blob);
      setResumeUrl(url);
   }
  
   loadResume();
   }, [imagePath])
  
  
  
  return (
    <Link to={`/resume/${resume.id}`} className='resume-card animate-in fade-in duration-1000'>
      {resume.companyName || 'Resume'}
     
     <div className='resume-card-header'>
<div className='flex flex-col gap-2'>
           {companyName && <h2 className='text-black font-bold wrap-break-word'>{resume.companyName}</h2>}
           {jobTitle && <h3 className='text-gray-500 font-bold wrap-break-word'>{resume.jobTitle}</h3>}
           {!companyName && !jobTitle && <h2 className='text-black font-bold'> Resume </h2>}
      
           </div>
      <div className='shrink-0'>
       <ScoreCircle score = {resume.feedback.overallScore}/>  
      </div>
       </div>

 {resumeUrl && (
   <div className='gradient-border animate-in fade-in duration-1000 flex-1'>
   <div className='w-full h-full '>
    <img
     src ={resumeUrl}
    alt ="reume"
     className='w-full h-[350px] max-sm:h-[200px] object-cover'
    />

   </div>
</div>
  )}
    </Link>
  )
}

export default ResumeCard
