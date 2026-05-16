import { useEffect } from "react";
import { useNavigate, type NavigateFunction } from "react-router";
import { usePuterStore } from "~/lib/puter";
import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import { resumes } from "~/constants";
import ResumeCard from "~/components/ResumeCard";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "ResumeIQ " },
    { name: "description", content: "Smart feedback for your dream job !" },
  ];
}

export default function Home() {
  const { auth } = usePuterStore();
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/auth?next=/");
    }
  }, [auth.isAuthenticated, navigate]);

  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
   <Navbar/>

<section className="main-section">
<div className="page-heading py-16 ">
   <h1>Track Your Applications &  Resume Ratings</h1>
  <h2>Review your submissions and check AI- powered feedbback. </h2>
</div>



{resumes.length>0 &&(

<div className='resumes-section'>
{resumes.map (resume => (
 <ResumeCard key={resume.id} resume={resume} /> 
))}
</div>
)}

</section>
    </main>
}
