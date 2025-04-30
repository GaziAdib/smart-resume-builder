"use client";

import { useState } from 'react';
import ProjectCard from '../cards/ProjectCard';

const Projects = ({ projects, setting }) => {
  const [headerBgColor, setHeaderBgColor] = useState('#ffffff');
  const [isHovered, setIsHovered] = useState(false);

  const handleColorChange = (event) => {
    setHeaderBgColor(event.target.value);
  };

  return (
<>
<div style={{ pageBreakAfter: 'always', pageBreakInside: 'avoid' }} className="container rounded-md py-2 my-2 mx-auto justify-center items-center relative group"></div>
<div className="container rounded-md py-2 my-2 mx-auto justify-center items-center relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className={` text-gray-900 my-4 py-2 px-2  border-l-gray-900`} style={{ backgroundColor: headerBgColor }}>
        <p className="text-xl font-semibold text-center">My Projects</p>
        {isHovered && (
          <input type="color" value={headerBgColor} onChange={handleColorChange} className="absolute right-4 top-4 cursor-pointer" />
        )}
      </div>
      <hr className='w-1/2 mx-auto' />
      {setting?.showWorkExperience && (
        <div>
          {projects?.map((project) => (
            <ProjectCard key={project?.id} project={project} />
          ))}
        </div>
      )}
    </div>

    <div style={{ pageBreakAfter: 'always', pageBreakInside: 'avoid' }} ></div>
</>
    
  );
}

export default Projects;