"use client";

import { FiGrid, FiList } from 'react-icons/fi';
import { useState } from "react";
import EducationCard from "../cards/EducationCard";
import EducationTable from "../tables/EducationTable";

const Educations = ({ educations, setting }) => {
  const [view, setView] = useState('card');
  const [headerBgColor, setHeaderBgColor] = useState('#9bedff'); // Initial color
  const [isHovered, setIsHovered] = useState(false);

  const toggleView = () => {
    // Toggles between 'card' and 'table' views
    setView(prevView => (prevView === 'card' ? 'table' : 'card'));
  };

  const handleColorChange = (event) => {
    setHeaderBgColor(event.target.value);
  };

  return (
    <>
    <div style={{ pageBreakAfter: 'always', pageBreakInside: 'avoid' }} className="container rounded-md py-2 my-2 mx-auto justify-center items-center relative group"></div>
    <div style={{ pageBreakAfter: 'always', pageBreakInside: 'avoid' }} className="container rounded-md py-2 my-2 mx-auto justify-center items-center relative group" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className={`bg-blue-300 text-gray-900 my-4 py-2 px-2 shadow-sm border-2 border-l-gray-900 group-hover:flex justify-between`} style={{ backgroundColor: headerBgColor }}>
        <p className="text-xl font-semibold">Educational Qualifications</p>
        <div className="absolute right-0 top-0 mt-2 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <input type="color" value={headerBgColor} onChange={handleColorChange} className="mr-2 px-2 py-1 cursor-pointer bg-blue-500 text-white rounded-md" />
          <button onClick={toggleView} className="px-2 py-1 bg-blue-500 text-white rounded-md">
            {view === 'card' ? <FiList className="inline-block mr-1" /> : <FiGrid className="inline-block mr-1" />} {view === 'card' ? 'Table' : 'Card'}
          </button>
        </div>
      </div>
      {view === 'card' ? (
        educations?.map((education) => (
          <EducationCard key={education.id} education={education} />
        ))
      ) : (
        <EducationTable educations={educations} />
      )}
    </div>
    </>
    
  );
}

export default Educations;