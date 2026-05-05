import React from 'react'
import { Link } from 'react-router'
import ScoreCircle from './ScoreCircle'

const ResumeCard = ({resume}: {resume: Resume}) => {
  return (
    <Link to={`/resume/${resume.id}`} className='resume-card animate-in fade-in duration-1000'>
      {resume.companyName || 'Resume'}
     
     <div className='resume-card-header'>

     
      <div className='flex flex-col gap-2'>
<h2 className='text-black font-bold wrap-break-word'>
  {resume.companyName}
</h2>
 <h3 className='text-gray-500 font-bold wrap-break-word'>
  {resume.jobTitle}
 </h3>
      </div>
      <div className='shrink-0'>
       <ScoreCircle score = {resume.feedback.overallScore}/>  
      </div>
       </div>

<div className='gradient-border animate-in fade-in duration-1000 flex-1'>
   <div className='w-full h-full '>
    <img src ={resume.imagePath}
    alt ="reume"
     className='w-full h-full object-cover object-top'
    
    />

   </div>

</div>
    </Link>
  )
}

export default ResumeCard
