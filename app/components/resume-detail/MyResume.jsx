

"use client";

import { useRef } from "react";
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


      

      // const [{ isDragging }, drag] = useDrag({
      //   type: 'BOX',
      //   collect: (monitor) => ({
      //     isDragging: !!monitor.isDragging(),
      //   })
      // })

      // const [{ canDrop, isOver }, drop] = useDrop({
      //   accept: 'BOX',
      //   collect: (monitor) => ({
      //     isOver: monitor.isOver(),
      //     canDrop: !!monitor.canDrop(),
      //   })
      // })

     
      
      // const isActive = canDrop && isOver;


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

   
  
      {experiences?.length > 0 && (
         <Experiences experiences={experiences} /> 
      )}
    
    

           
        {skills?.length > 0 && (
             <Skills skills={skills} />
          )}
          
         

    {resumeInfo?.interests?.length > 0 &&
      <div  style={{pageBreakAfter: 'always', pageBreakInside: 'avoid'}} className="container rounded-md py-2 my-2 mx-auto justify-center items-center">
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

   


    {educations?.length > 0 && 

      <Educations educations={educations} />
    
    }
    



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