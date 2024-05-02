"use client";
import {useState } from 'react';
import Skills from '../listings/Skills';
import Experiences from '../listings/Experiences';
import Educations from '../listings/Educations';
import PersonalDetailCard from '../cards/PersonalDetailCard';
import Interests from '../listings/Interests';
import LanguageProficiencies from '../listings/LanguageProficiencies';
import CareerObjectiveCard from '../cards/CareerObjectiveCard';
import HeroSection from '../cards/HeroSection';

const TestResume = ({ currentUserInfo, resumeInfo, educations, experiences, skills, setting }) => {

  //const {showPersonalDetail,showWorkExperience, showEducation } = setting || {};
    

  const initialSections = [
    { id: 'hero', title: 'Hero', content: <HeroSection profileImage={resumeInfo?.profileImage} currentUserInfo={currentUserInfo} />, prev: null, next: 'careerObjective' },
    { id: 'careerObjective', title: 'Career Objective', content: <CareerObjectiveCard careerObjective={resumeInfo?.careerObjective} />, prev: 'hero', next: 'experience' },
    { id: 'experience', title: 'Experience', content: <Experiences experiences={experiences} setting={setting} />, prev: 'careerObjective', next: 'skill' },
    { id: 'skill', title: 'Skill', content: <Skills skills={skills} />, prev: 'experience', next: 'education' },
    { id: 'education', title: 'Education', content: <Educations educations={educations} setting={setting} />, prev: 'skill', next: 'interests' },
    { id: 'interests', title: 'Interests', content: <Interests interests={resumeInfo?.interests} />, prev: 'education', next: 'languageProficiencies' },
    { id: 'languageProficiencies', title: 'Language Proficiencies', content: <LanguageProficiencies languageProficiencies={resumeInfo?.languageProficiencies} />, prev: 'interests', next: 'personalDetail' },
    { id: 'personalDetail', title: 'Personal Detail', content: <PersonalDetailCard personalDetail={resumeInfo?.personalDetail} setting={setting} />, prev: 'languageProficiencies', next: null },
  ];

  const [sections, setSections] = useState(initialSections);
  
  //const [sections, setSections] = useState(() => {
  //   const storedSections = localStorage.getItem('sections');
  //   console.log('Stored Sections:', storedSections);
  
  //   return storedSections ? JSON.parse(storedSections) : [
  //     { id: 'hero', title: 'Hero', content: <HeroSection profileImage={resumeInfo?.profileImage} currentUserInfo={currentUserInfo} />},
  //     { id: 'careerObjective', title: 'Career Objective', content: <CareerObjectiveCard careerObjective={resumeInfo?.careerObjective} />},
  //     { id: 'experience', title: 'Experience', content: <Experiences experiences={experiences} /> },
  //     { id: 'skill', title: 'Skill', content: <Skills skills={skills} /> },
  //     { id: 'education', title: 'Education', content: <Educations educations={educations} /> },
  //     { id: 'interests', title: 'Interests', content: <Interests interests={resumeInfo?.interests} /> },
  //     { id: 'languageProficiencies', title: 'Language Proficiencies', content: <LanguageProficiencies languageProficiencies={resumeInfo?.languageProficiencies} /> },
  //     { id: 'personalDetail', title: 'Personal Detail', content: <PersonalDetailCard personalDetail={resumeInfo?.personalDetail} />}
  //   ]
  // });
  
  // useEffect(() => {
  //   // Extract data from each section object
  //   const sectionsData = sections?.map(section => ({
  //     id: section?.id,
  //     title: section?.title
  //   }));
    
  //   // Store the extracted data in localStorage
  //   localStorage.setItem('sections', JSON.stringify(sectionsData));
  // }, [sections]);
  
  const handleDragStart = (event, section) => {
    event.dataTransfer.setData('sectionId', section.id);
  };
  
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, targetSection) => {
    const sectionId = event.dataTransfer.getData('sectionId');
    const draggedSectionIndex = sections.findIndex(section => section.id === sectionId);
    const targetSectionIndex = sections.findIndex(section => section.id === targetSection.id);
  
    // If the dragged section and target section are the same, do nothing
    if (draggedSectionIndex === targetSectionIndex) {
      return;
    }
  
    // Create a copy of the sections array
    const updatedSections = [...sections];
  
    // Remove the dragged section from its current position
    const [draggedSection] = updatedSections.splice(draggedSectionIndex, 1);
  
    // Insert the dragged section at the target position
    updatedSections.splice(targetSectionIndex, 0, draggedSection);
  
    // Update the state with the new sections array
    setSections(updatedSections);
  };

  // const handleDrop = (event, targetSection) => {
  //   const sectionId = event.dataTransfer.getData('sectionId');
  //   const draggedSectionIndex = sections.findIndex(section => section.id === sectionId);
  //   const targetSectionIndex = sections.findIndex(section => section.id === targetSection.id);
  
  //   const updatedSections = [...sections];
  //   const draggedSection = updatedSections.splice(draggedSectionIndex, 1)[0];
  //   updatedSections.splice(targetSectionIndex, 0, draggedSection);
  //   setSections(updatedSections);

  // };

  // useEffect(() => {
  //   localStorage.setItem('sections', JSON.stringify(sections));
  // }, [sections]);
  
  //   const handleDragStart = (event, section) => {
  //     event.dataTransfer.setData('sectionId', section.id);
  //   };
  
  //   const handleDragOver = (event) => {
  //     event.preventDefault();
  //   };
  
  //   const handleDrop = (event, targetSection) => {
  //     const sectionId = event.dataTransfer.getData('sectionId');
  //     const draggedSectionIndex = sections.findIndex(section => section.id === sectionId);
  //     const targetSectionIndex = sections.findIndex(section => section.id === targetSection.id);
  
  //     const updatedSections = [...sections];
  //     const draggedSection = updatedSections.splice(draggedSectionIndex, 1)[0];
  //     updatedSections.splice(targetSectionIndex, 0, draggedSection);
  
  //     setSections(updatedSections);
  //   };


    return (
        <div>
        <h1>Test Resume</h1>
  
        {sections?.map(section => (
          <div
            key={section?.id}
            onDragOver={handleDragOver}
            onDrop={(event) => handleDrop(event, section)}
          >
            <div
              draggable
              onDragStart={(event) => handleDragStart(event, section)}
            >
              {/* {section.title} */}
            </div>
            {section?.content}
          </div>
        ))}
      </div>
    );
  };
  
  export default TestResume;