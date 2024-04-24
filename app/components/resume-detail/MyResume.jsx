"use client";

import { useRef, useState } from "react";
import CareerObjectiveCard from "../cards/CareerObjectiveCard"
import HeroSection from "../cards/HeroSection"
import PersonalDetailCard from "../cards/PersonalDetailCard"
import Educations from "../listings/Educations"
import Experiences from "../listings/Experiences"
import Interests from "../listings/Interests"
import LanguageProficiencies from "../listings/LanguageProficiencies"
import Skills from "../listings/Skills"
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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


   
    // const handleGeneratePDF = async () => {
    //     const input = resumeContentRef?.current;
      
    //     // Ensure input element exists before proceeding
    //     if (!input) {
    //       console.error('Error: Resume content element not found.');
    //       return;
    //     }
      
    //     // Clone the element to avoid modifying original content
    //     const clonedContent = input.cloneNode(true);
      
    //     html2canvas(clonedContent, { scrollY: -window.scrollY }).then((canvas) => {
    //       const imgData = canvas.toDataURL('image/png'); // Temporary for debugging
    //       const pdf = new jsPDF('p', 'mm', 'a4');
    //       const imgWidth = 210;
    //       const pageHeight = 295;
    //       const maxChunkHeight = 1000; // Adjust based on your needs
      
    //       let contentHeight = clonedContent.offsetHeight;
    //       let remainingHeight = contentHeight;
    //       let currentPage = 1;
    //       let position = 0;
      
    //       const processContent = (content, remainingHeight) => {
    //         const chunkHeight = Math.min(remainingHeight, maxChunkHeight, pageHeight);
      
    //         // Capture content slice for this page using a new canvas
    //         const sliceCanvas = document.createElement('canvas');
    //         const sliceCtx = sliceCanvas.getContext('2d');
    //         sliceCanvas.width = imgWidth;
    //         sliceCanvas.height = chunkHeight;
      
    //         // Check if content overflows the current canvas height
    //         if (chunkHeight < content.offsetHeight) {
    //           // Content overflows, adjust slice height and render only the visible part
    //           sliceCanvas.height = content.offsetHeight;
    //           sliceCtx.drawImage(content, 0, 0, imgWidth, chunkHeight, 0, 0, imgWidth, chunkHeight);
    //         } else {
    //           // Content fits, render the entire chunk
    //           sliceCtx.drawImage(content, 0, 0, imgWidth, chunkHeight);
    //         }
      
    //         // Convert slice canvas to PNG data URL (optional for debugging)
    //         // const sliceImgData = sliceCanvas.toDataURL('image/png');
    //         // console.log('Slice image data:', sliceImgData);
      
    //         // Add slice image to PDF
    //         pdf.addImage(sliceCanvas, 'PNG', 0, position, imgWidth, chunkHeight);
      
    //         remainingHeight -= chunkHeight;
    //         position += chunkHeight;
      
    //         // Handle page breaks and optional second-page div
    //         if (remainingHeight <= 0) {
    //           if (currentPage === 1 && chunkHeight < contentHeight) {
    //             // Add a div for second page content (optional)
    //             const div = document.createElement('div');
    //             div.style.height = '30px'; // Adjust height as needed
    //             content.appendChild(div);
    //             contentHeight = content.offsetHeight; // Recalculate content height
    //             remainingHeight = contentHeight;
    //           } else {
    //             // No more content, or div added, move to next page
    //             pdf.addPage();
    //             currentPage++;
    //             position = 0;
    //           }
    //         }
      
    //         // Recursively process remaining content (if any)
    //         if (remainingHeight > 0) {
    //           processContent(content, remainingHeight);
    //         } else {
    //           pdf.save('my_resume.pdf');
    //         }
    //       };
      
    //       processContent(clonedContent, remainingHeight);
    //     });
    //   };
    
   


  return (
    <>
    <div id="resume-content"  ref={resumeContentRef}>
    <h1 className="font-extrabold text-center text-2xl my-2 py-2">My Resume</h1>
    <div className="main-wrapper mx-2 px-2 py-3 my-3">

    <div className="container rounded-md  py-4 my-2 mx-auto justify-center items-center">
        <HeroSection profileImage={resumeInfo?.profileImage} currentUserInfo={currentUserInfo} />
    </div>

    <div className="container rounded-md  py-4 my-2 mx-auto justify-center items-center">
        <div className="bg-gray-50 text-gray-900 my-4 py-2 px-2 shadow-sm  border-2 border-l-gray-900 ">
            <p className="text-xl font-semibold">Career Objective</p>
        </div>
      <CareerObjectiveCard careerObjective={resumeInfo?.careerObjective} />
    </div>

    {experiences?.length > 0 &&
      <div style={{pageBreakAfter: 'always', pageBreakInside: 'avoid'}} className="container rounded-md py-2 my-2 mx-auto justify-center items-center">
        <div className="bg-blue-300 text-gray-900 my-4 py-2 px-2 shadow-sm border-2 border-l-gray-900 ">
            <p className="text-xl font-semibold">Work Experiences</p>
        </div>
        <Experiences experiences={experiences} />
      </div>
    }


    {skills?.length > 0 &&
          <div style={{pageBreakAfter: 'always', pageBreakInside: 'avoid'}} className="container rounded-md py-2 my-2 mx-auto justify-center items-center">
            <div className="bg-blue-300 text-gray-900 my-2 py-2 px-2 shadow-sm border-2 border-l-gray-900 ">
                <p className="text-xl font-semibold">My Skills</p>
            </div>
            <Skills skills={skills} />
          </div>
      }

    {resumeInfo?.interests?.length > 0 &&
      <div style={{pageBreakAfter: 'always', pageBreakInside: 'avoid'}} className="container rounded-md py-2 my-2 mx-auto justify-center items-center">
        <div className="bg-blue-300 text-gray-900 my-2 py-2 px-2 shadow-sm border-2 border-l-gray-900 ">
            <p className="text-xl font-semibold">My Interests</p>
        </div>
        <Interests interests={resumeInfo?.interests} />
      </div>
    }

    {resumeInfo?.languageProficiencies?.length > 0 &&
      <div style={{pageBreakAfter: 'always', pageBreakInside: 'avoid'}} className="container rounded-md py-2 my-2 mx-auto justify-center items-center">
        <div className="bg-blue-300 text-gray-900 my-4 py-2 px-2 shadow-sm border-2 border-l-gray-900 ">
            <p className="text-xl font-semibold">Language Proficiencies</p>
        </div>
        <LanguageProficiencies languageProficiencies={resumeInfo?.languageProficiencies} />
      </div>
    }

   


    <div style={{pageBreakAfter: 'always', pageBreakInside: 'avoid'}} className="container rounded-md py-2 my-2 mx-auto justify-center items-center">
      <div className="bg-blue-300 text-gray-900 my-4 py-2 px-2 shadow-sm border-2 border-l-gray-900 ">
          <p className="text-xl font-semibold">Educational Qualifications</p>
      </div>
      <Educations educations={educations} />
    </div>



      <div style={{pageBreakAfter: 'always', pageBreakInside: 'avoid'}} className="container rounded-md py-2 my-2 mx-auto justify-center items-center">
        <div className="bg-blue-300 text-gray-900 my-2 py-2 px-2 shadow-sm border-2 border-l-gray-900 ">
            <p className="text-xl font-semibold">Personal Details</p>
        </div>
        <PersonalDetailCard personalDetail={resumeInfo?.personalDetail} />
      </div>


    </div>
    </div>
   
    <button onClick={handleGeneratePDF}>Generate PDF</button>
      
</>
  )
}

export default MyResume