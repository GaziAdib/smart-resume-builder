"use client";

import { FiGrid, FiList } from 'react-icons/fi';
import { useState } from "react";
import EducationCard from "../cards/EducationCard"
import EducationTable from "../tables/EducationTable";

const Educations = ({educations, setting}) => {

  const [view, setView] = useState('card');

  const toggleView = () => {
    // Toggles between 'card' and 'table' views
    setView(prevView => (prevView === 'card' ? 'table' : 'card'));
  };

  if(setting?.showEducation) {
    return (

      <div style={{ pageBreakAfter: 'always', pageBreakInside: 'avoid' }} className="container rounded-md py-2 my-2 mx-auto justify-center items-center relative group">
      <div className="bg-blue-300 text-gray-900 my-4 py-2 px-2 shadow-sm border-2 border-l-gray-900 group-hover:flex justify-between">
        <p className="text-xl font-semibold">Educational Qualifications</p>
        {/* Buttons to toggle between views */}
        <div className="absolute right-0 top-0 mt-2 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button onClick={toggleView} className="mr-2 px-2 py-1 bg-blue-500 text-white rounded-md">
            <FiList className="inline-block mr-1" /> Table
          </button>
          <button onClick={toggleView} className="px-2 py-1 bg-blue-500 text-white rounded-md">
            <FiGrid className="inline-block mr-1" /> Card
          </button>
        </div>
      </div>
      {/* Render either card or table view based on the state */}
      {view === 'card' ? (
        educations?.map((education) => (
          <EducationCard key={education.id} education={education} />
        ))
      ) : (
        <EducationTable educations={educations} />
      )}
    </div>
      
      
    )
  }
  
}

export default Educations

