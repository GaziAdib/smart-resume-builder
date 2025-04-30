"use client";

import { FiGrid, FiList, FiArrowUp, FiArrowDown } from 'react-icons/fi';
import { useEffect, useState } from "react";
import EducationCard from "../cards/EducationCard";
import EducationTable from "../tables/EducationTable";
import { usePathname } from 'next/navigation';


const Educations = ({ educations, setting }) => {


  let fullpath = usePathname();

  fullpath = fullpath.split('/')[3];

  const [view, setView] = useState('card');
  const [headerBgColor, setHeaderBgColor] = useState('#ffffff');
  const [isHovered, setIsHovered] = useState(false);
  const [sortedEducations, setSortedEducations] = useState([]);

  const defaultSettings = {
    showPersonalDetail: false,
    showEducation: true,
    showWorkExperience: true,
    ...setting 
  };
 

  useEffect(() => {
    setSortedEducations(educations);
  }, [educations]);

  const toggleView = () => {
    setView(prevView => (prevView === 'card' ? 'table' : 'card'));
  };

  const sortEducations = (order) => {
    const sortedList = [...sortedEducations].sort((a, b) => {
      if (order === 'asc') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });
    setSortedEducations(sortedList);
  };

  const handleColorChange = (event) => {
    setHeaderBgColor(event.target.value);
  };

  if (!defaultSettings?.showEducation) return null;

  return (
    <>
      <div
        style={{ pageBreakAfter: 'always', pageBreakInside: 'avoid' }}
        className="container rounded-md py-2 my-2 mx-auto justify-center items-center relative group"
      ></div>
      <div
        style={{ pageBreakAfter: 'always', pageBreakInside: 'avoid' }}
        className="container  rounded-md py-2 my-2 mx-auto justify-center items-center relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={`bg-blue-300 text-gray-900 my-4 py-2 px-2 shadow-sm border-2 border-l-gray-900 group-hover:flex justify-between`}
          style={{ backgroundColor: headerBgColor }}
        >
          <p className={`text-xl font-semibold ${fullpath === 'developer' ? 'text-center' : ''}`}>Educational Qualifications</p>
          
          <div className="absolute right-0 top-0 mt-2 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center">
            <input
              type="color"
              value={headerBgColor}
              onChange={handleColorChange}
              className="mr-2 px-2 py-1 cursor-pointer bg-blue-500 text-white rounded-md"
            />
            <button onClick={toggleView} className="px-2 py-1 bg-blue-500 text-white rounded-md mr-2">
              {view === 'card' ? <FiList className="inline-block mr-1" /> : <FiGrid className="inline-block mr-1" />}{' '}
              {view === 'card' ? 'Table' : 'Card'}
            </button>
            <button
              onClick={() => sortEducations('asc')}
              className="px-2 py-1 bg-green-500 text-white rounded-md mr-2"
            >
              <FiArrowUp className="inline-block mr-1" /> Asc
            </button>
            <button
              onClick={() => sortEducations('desc')}
              className="px-2 py-1 bg-red-500 text-white rounded-md"
            >
              <FiArrowDown className="inline-block mr-1" /> Desc
            </button>
          </div>

          
        </div>
        <hr className='w-1/2 mx-auto' />

        {view === 'card' ? (
          sortedEducations.map((education) => (
            <EducationCard key={education.id} education={education} />
          ))
        ) : (
          <EducationTable educations={sortedEducations} />
        )}
      </div>
    </>
  );

  
}

export default Educations;