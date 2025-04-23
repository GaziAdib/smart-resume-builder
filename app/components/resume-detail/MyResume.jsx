"use client";

import { useRef, useState } from "react";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import TestResume from "../TestResume/TestResume";

import { PDFDocument as PDFLib } from 'pdf-lib';
import { saveAs } from 'file-saver';

const MyResume = ({currentUserInfo, resumeInfo, educations, experiences, skills, references, setting}) => {

  const [selectedFont, setSelectedFont] = useState('');

  const handleFontChange = (e) => {
    const fontValue = e.target.value;
    document.documentElement.style.setProperty('--user-selected-font', fontValue);
    setSelectedFont(fontValue);
  };



  const [selectedFormat, setSelectedFormat] = useState('A4'); // Initialize with default value 'A4'
  
    const resumeContentRef = useRef(null);

    const handleFormatChange = (e) => {
      setSelectedFormat(e.target.value);
    };

    const handleGeneratePDF = async () => {

      //window.print();
      const input = resumeContentRef?.current;

      //Ensure the image is fully loaded before capturing the canvas
        const images = input.getElementsByTagName('img');
        const promises = Array.from(images).map(img => {
          return new Promise((resolve, reject) => {
            if (img.complete) {
              resolve();
            } else {
              img.onload = resolve;
              img.onerror = reject;
            }
          });
        });

        await Promise.all(promises);
  
      html2canvas(input, { scrollY: -window.scrollY, useCORS:true }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
  
        let pdfWidth, pdfHeight;
  
        if (selectedFormat === 'A4') {
          pdfWidth = 210; // A4 width in mm
          pdfHeight = 297; // A4 height in mm
        } else {
          pdfWidth = 150; // Mobile width in mm
          pdfHeight = 210; // Mobile height in mm
        }
  
        const pdf = new jsPDF('p', 'mm', selectedFormat);
        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
        let position = 0;
        let heightLeft = imgHeight;
  
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
  
          // Add a div element that only appears on the second page and onwards
          if (position < 0) {
            const div = document.createElement('div');
            div.style.height = '20px';
            input.appendChild(div);
          }
  
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  
          // Add new page if there's remaining content
          if (heightLeft > 0) {
            pdf.addPage();
          }
  
          // Move to the next page
          heightLeft -= pdfHeight;
        }
  
        pdf.save('my_resume.pdf');
      });
  
       
    };



  return (
    <>
    
    
    <div className="bg-gray-50 dark:bg-gray-900 my-10 py-5" style={{ fontFamily: `var(${selectedFont})` }} id="resume-content"  ref={resumeContentRef}>
    <h1 className="font-extrabold text-center text-2xl my-2 py-2">My Resume</h1>
      <div className="main-wrapper mx-2 px-2 py-3 my-3 custom-font">
      <div className="avoid-break">
            <TestResume currentUserInfo={currentUserInfo} resumeInfo={resumeInfo} educations={educations} experiences={experiences} skills={skills} references={references} setting={setting} profileImage={resumeInfo?.profileImage} />
        </div>
      </div>
    </div>

    <div className="my-4 dark:bg-gray-900 py-4 justify-center px-4">
      <div className="flex flex-col space-y-4">
      <label htmlFor="font-selector" className="text-gray-700 dark:text-white">Select Font Family:</label>
      <select id="font-selector" value={selectedFont} onChange={handleFontChange} className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300">
        <option value="Poppins">Poppins</option>
        <option value="Serif">Serif</option>
        <option value="Roboto">Roboto</option>
      </select>
    </div>
    <div className="flex flex-col space-y-4 ">
      <label htmlFor="formatSelect" className="text-gray-700 dark:text-white">Select PDF Format:</label>
      <select id="formatSelect" value={selectedFormat} onChange={handleFormatChange} className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300">
        <option value="A4">A4</option>
        <option value="A5">A5</option>
      </select>
    </div>
    </div>

    <button
      onClick={handleGeneratePDF}
      className="relative overflow-hidden group mx-auto my-2 px-8 py-3 text-xl font-bold text-white text-center rounded-lg shadow-2xl transition-all duration-300 ease-out transform hover:scale-105 hover:shadow-xl active:scale-95"
    >
      {/* Gradient background */}
      <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-600 group-hover:from-emerald-500 group-hover:via-teal-600 group-hover:to-cyan-700 transition-all duration-300"></span>
      
      {/* Shine effect */}
      <span className="absolute top-0 left-0 w-full h-full opacity-30 group-hover:opacity-0 transition-opacity duration-300">
        <span className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-white/50 to-transparent transform -skew-x-12"></span>
      </span>
      
      {/* Border animation */}
      <span className="absolute inset-0 rounded-lg p-[2px]">
        <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
      </span>
      
      {/* Button text */}
      <span className="relative flex items-center justify-center gap-2">
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
        </svg>
        Generate PDF
      </span>
    </button>
</>
  )
}

export default MyResume