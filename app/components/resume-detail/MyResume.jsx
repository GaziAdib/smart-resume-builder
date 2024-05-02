"use client";

import { useRef } from "react";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import TestResume from "../TestResume/TestResume";


const MyResume = ({currentUserInfo, resumeInfo, educations, experiences, skills}) => {

  
    const resumeContentRef = useRef(null);

    const handleGeneratePDF = async () => {

        const input = resumeContentRef?.current;
    
        html2canvas(input, { scrollY: -window.scrollY }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 210;
            const pageHeight = 295;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;
      
            while (heightLeft >= 0) {
              position = heightLeft - imgHeight;
      
              // Add a div element that only appears on the second page and onwards
              if (position < 0) {
                const div = document.createElement('div');
                div.style.height = '12px';
                input.appendChild(div);
              }
      
              pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      
              // Add new page if there's remaining content
              if (heightLeft > 0) {
                pdf.addPage();
              }
      
              // Move to the next page
              heightLeft -= pageHeight;
            }
      
            pdf.save('my_resume.pdf');
          });
    };

  return (
    <>
    <div id="resume-content"  ref={resumeContentRef}>
    <h1 className="font-extrabold text-center text-2xl my-2 py-2">My Resume</h1>
      <div className="main-wrapper mx-2 px-2 py-3 my-3">
        <TestResume currentUserInfo={currentUserInfo} resumeInfo={resumeInfo} educations={educations} experiences={experiences} skills={skills} />
      </div>
    </div>

    <button className="bg-green-200 mx-0 auto text-black font-bold text-center px-2 py-1 text-xl rounded-sm shadow-md border-2" onClick={handleGeneratePDF}>Generate PDF</button>
</>
  )
}

export default MyResume