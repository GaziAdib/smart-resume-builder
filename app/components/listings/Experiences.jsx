"use client";

import { useState } from 'react';
import ExperienceCard from "../cards/ExperienceCard";

const Experiences = ({ experiences, setting }) => {
  const [headerBgColor, setHeaderBgColor] = useState('#9bedff'); // Initial color
  const [isHovered, setIsHovered] = useState(false);

  const handleColorChange = (event) => {
    setHeaderBgColor(event.target.value);
  };

  return (
<>
<div style={{ pageBreakAfter: 'always', pageBreakInside: 'avoid' }} className="container rounded-md py-2 my-2 mx-auto justify-center items-center relative group"></div>
<div className="container rounded-md py-2 my-2 mx-auto justify-center items-center relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className={`bg-blue-300 text-gray-900 my-4 py-2 px-2 shadow-sm border-2 border-l-gray-900`} style={{ backgroundColor: headerBgColor }}>
        <p className="text-xl font-semibold">Work Experiences</p>
        {isHovered && (
          <input type="color" value={headerBgColor} onChange={handleColorChange} className="absolute right-4 top-4 cursor-pointer" />
        )}
      </div>
      {setting?.showWorkExperience && (
        <div>
          {experiences?.map((experience) => (
            <ExperienceCard key={experience?.id} experience={experience} />
          ))}
        </div>
      )}
    </div>

    <div style={{ pageBreakAfter: 'always', pageBreakInside: 'avoid' }} ></div>
</>
    
  );
}

export default Experiences;