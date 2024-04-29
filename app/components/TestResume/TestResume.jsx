"use client";
import { useState } from 'react';
import Skills from '../listings/Skills';
import Experiences from '../listings/Experiences';
import Educations from '../listings/Educations';

const TestResume = ({ currentUserInfo, resumeInfo, educations, experiences, skills }) => {
    const [sections, setSections] = useState([
      { id: 'experience', title: 'Experience', content: <Experiences experiences={experiences} /> },
      { id: 'skill', title: 'Skill', content: <Skills skills={skills} /> },
      { id: 'education', title: 'Education', content: <Educations educations={educations} /> },
    ]);
  
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
  
      const updatedSections = [...sections];
      const draggedSection = updatedSections.splice(draggedSectionIndex, 1)[0];
      updatedSections.splice(targetSectionIndex, 0, draggedSection);
  
      setSections(updatedSections);
    };
  
    return (
        <div>
        <h1>Test Resume</h1>
  
        {sections.map(section => (
          <div
            key={section.id}
            onDragOver={handleDragOver}
            onDrop={(event) => handleDrop(event, section)}
          >
            <div
              draggable
              onDragStart={(event) => handleDragStart(event, section)}
            >
              {/* {section.title} */}
            </div>
            {section.content}
          </div>
        ))}
      </div>
    );
  };
  
  export default TestResume;