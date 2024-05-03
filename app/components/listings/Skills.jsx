"use client";

import { useState } from 'react';
import { FiGrid, FiList } from 'react-icons/fi'; // Importing icons from React Icons

const Skills = ({ skills }) => {
  const [view, setView] = useState('card');
  const [headerBgColor, setHeaderBgColor] = useState('#9bedff'); // Initial color
  const [isHovered, setIsHovered] = useState(false);

  const toggleView = () => {
    setView(prevView => (prevView === 'card' ? 'list' : 'card'));
  };

  const handleColorChange = (event) => {
    setHeaderBgColor(event.target.value);
  };

  return (
    <div className="container rounded-md py-2 my-2 mx-auto justify-center items-center" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className={`bg-blue-300 text-gray-900 my-2 py-2 px-2 shadow-sm border-2 border-l-gray-900 flex justify-between items-center`} style={{ backgroundColor: headerBgColor }}>
        <p className="text-xl font-semibold">My Skills</p>
        <div className={isHovered ? 'block' : 'hidden'}>
          <input type="color" value={headerBgColor} onChange={handleColorChange} className="mr-2 px-2 py-1 cursor-pointer bg-blue-500 text-white rounded-md" />
          <button onClick={toggleView} className="px-2 py-1 bg-blue-500 text-white rounded-md">
            {view === 'card' ? <FiList /> : <FiGrid />}
          </button>
        </div>
      </div>

      {view === 'card' ? (
        <div className="grid grid-cols-3 gap-2">
          {skills?.map((skill, index) => (
            <div key={index} className="bg-gray-50 p-2 rounded-md">
              <p className="text-gray-700 font-semibold text-center">{skill.name}</p>
            </div>
          ))}
        </div>
      ) : (
        <ul className="list-disc ml-8">
          {skills?.map((skill, index) => (
            <li key={index} className="text-gray-600 py-0.5">{skill.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Skills;