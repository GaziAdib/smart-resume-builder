"use client";

import { useRef, useState } from "react";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import TestResume from "../TestResume/TestResume";



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


    // const handleGeneratePDF = async () => {
    //   const input = resumeContentRef?.current;

    //   // Ensure the image is fully loaded before capturing the canvas
    //     const images = input.getElementsByTagName('img');
    //     const promises = Array.from(images).map(img => {
    //       return new Promise((resolve, reject) => {
    //         if (img.complete) {
    //           resolve();
    //         } else {
    //           img.onload = resolve;
    //           img.onerror = reject;
    //         }
    //       });
    //     });

    //     await Promise.all(promises);
  
    //   const canvas = await html2canvas(input, { scrollY: -window.scrollY, useCORS:true });
    //   const imgData = canvas.toDataURL('image/png');
  
    //   const pdfWidth = selectedFormat === 'A4' ? 210 : 148; // A5 width is 148 mm
    //   const pdfHeight = selectedFormat === 'A4' ? 297 : 210; // A5 height is 210 mm
    //   const pdf = new jsPDF('p', 'mm', selectedFormat);
      
    //   const imgWidth = pdfWidth;
    //   const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
    //   let heightLeft = imgHeight;
    //   let position = 0;
  
    //   while (heightLeft > 0) {
    //     pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    //     heightLeft -= pdfHeight;
    //     position -= pdfHeight;
  
    //     if (heightLeft > 0) {
    //       pdf.addPage();
    //     }
    //   }
  
    //   pdf.save('my_resume.pdf');
    // };

  return (
    <>
    
    
    <div className="bg-gray-50 dark:bg-gray-900" style={{ fontFamily: `var(${selectedFont})` }} id="resume-content"  ref={resumeContentRef}>
    <h1 className="font-extrabold text-center text-2xl my-2 py-2">My Resume</h1>
      <div className="main-wrapper  mx-2 px-2 py-3 my-3 custom-font">
      <div className="avoid-break">
            <TestResume currentUserInfo={currentUserInfo} resumeInfo={resumeInfo} educations={educations} experiences={experiences} skills={skills} references={references} setting={setting} profileImage={resumeInfo?.profileImage} />
        </div>
      </div>
    </div>

    <div className=" my-4 py-4 justify-center px-4">
      <div className="flex flex-col space-y-4">
      <label htmlFor="font-selector" className="text-gray-700">Select Font Family:</label>
      <select id="font-selector" value={selectedFont} onChange={handleFontChange} className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300">
        <option value="Poppins">Poppins</option>
        <option value="Serif">Serif</option>
        <option value="Roboto">Roboto</option>
        {/* Add more options as needed */}
      </select>
    </div>
    <div className="flex flex-col space-y-4">
      <label htmlFor="formatSelect" className="text-gray-700">Select PDF Format:</label>
      <select id="formatSelect" value={selectedFormat} onChange={handleFormatChange} className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300">
        <option value="A4">A4</option>
        <option value="A5">A5</option>
      </select>
    </div>
    </div>

    <button className="bg-green-200 mx-0 auto text-black font-bold text-center px-2 py-1 text-xl rounded-sm shadow-md border-2" onClick={handleGeneratePDF}>Generate PDF</button>
</>
  )
}

export default MyResume