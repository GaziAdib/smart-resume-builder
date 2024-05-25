"use client";

import { useState } from 'react';
import Skills from '../listings/Skills';
import Experiences from '../listings/Experiences';
import Educations from '../listings/Educations';
import PersonalDetailCard from '../cards/PersonalDetailCard';
import Interests from '../listings/Interests';
import LanguageProficiencies from '../listings/LanguageProficiencies';
import CareerObjectiveCard from '../cards/CareerObjectiveCard';
import HeroSection from '../cards/HeroSection';
import References from '../listings/References';
import Projects from '../listings/Projects';
import Certificates from '../listings/Certificates';
import DevSkills from '../listings/DevSkills';

const DevResume = ({currentUserInfo, resumeInfo, educations, experiences, devSkills, references, projects, certificates, setting }) => {


  const initialSections = [
    { id: 'hero', title: 'Hero', content: <HeroSection profileImage={resumeInfo?.profileImage} currentUserInfo={currentUserInfo} />, prev: null, next: 'careerObjective' },
    { id: 'careerObjective', title: 'Career Objective', content: <CareerObjectiveCard careerObjective={resumeInfo?.careerObjective} />, prev: 'hero', next: 'experience' },
    { id: 'experience', title: 'Experience', content: <Experiences experiences={experiences} setting={setting} />, prev: 'careerObjective', next: 'skill' },
    { id: 'project', title: 'Project', content: <Projects projects={projects} setting={setting} />},
    { id: 'devSkill', title: 'Dev Skill', content: <DevSkills devSkills={devSkills} setting={setting} />},
    { id: 'education', title: 'Education', content: <Educations educations={educations} setting={setting} />, prev: 'skill', next: 'interests' },
    { id: 'languageProficiencies', title: 'Language Proficiencies', content: <LanguageProficiencies languageProficiencies={resumeInfo?.languageProficiencies} />, prev: 'interests', next: 'personalDetail' },
    { id: 'certificate', title: 'Certificate', content: <Certificates certificates={certificates} setting={setting} />},
    { id: 'reference', title: 'Reference', content: <References references={references} setting={setting} />},
   

  ];

  const [sections, setSections] = useState(initialSections);
  
  
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


    return (
        <div>
        
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
  
  export default DevResume;