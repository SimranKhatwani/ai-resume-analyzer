import React, {useState, useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { formatFileSize } from '../lib/format'
interface FileUploaderProps {
  onFileSelect: (file: File | null) => void;
}

const FileUploader = ({onFileSelect}: FileUploaderProps) => {
  const[file,setFile] = useState<File | null>(null);
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0] || null;
      setFile(file);
      onFileSelect(file);
    },
    [onFileSelect]
  );

  const maxFileSize = 20 * 1024 * 1024; // 20 MB

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop , multiple:false, accept: { 'application/pdf': ['.pdf'] }, maxSize: 20 * 1024 * 1024})


  return (
    <div className='w-full gradient-border'>
        <div {...getRootProps()}>
      <input {...getInputProps()} />
     <div className='space-y-4 cursor-pointer'>
 
  {file? (
    <div className="uploader-selected-file" onClick={(e) => e.stopPropagation()}>
   <img src="/images/pdf.png" alt="pdf"className='size-10'/>
    <div className='flex items-center space-x-3'>
      
      <div>
         <p className='text-sm text-gray-700 font-medium truncate max-w-xs'>{file.name}</p>
         <p className='text-sm text-gray-500'>{formatFileSize(file.size)}</p>
     
      </div>
     </div>

     <button className='p-2 cursor-pointer' onClick={(e) => {
      e.stopPropagation();
      setFile(null);
      onFileSelect?.(null);
     }}>
      <img src="/icons/cross.svg" alt="remove" className='w-4 h-4' />
      </button>

</div>

  ):(
  <div>
 <div className='mx-auto w-16 h-16 flex items-center justify-center mb-2 '>
  <img src="/icons/info.svg" alt="upload" className='size-20' />
 </div>

<p className='text-lg text-gray-500'>
<span className='font-semibold'>
  Click to Upload your resume
</span> or drag and drop it here. 
</p>
<p className='text-lg text-gray-500'> PDF (max {formatFileSize(maxFileSize)}) </p>
  </div>

  )}





     </div>
    </div>
    </div>
  )
}

export default FileUploader
