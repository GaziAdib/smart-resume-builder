"use client";

import { useState } from 'react';
import { FiGrid, FiList } from 'react-icons/fi'; // Importing icons from React Icons

const Interests = ({ interests }) => {
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
    <div className="container rounded-md my-4 mx-auto bg-white">
      <div className={`bg-blue-300 text-gray-900 py-2 px-4 border-b border-l-gray-900 flex justify-between items-center`} style={{ backgroundColor: headerBgColor }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <p className="text-lg font-semibold">My Interests</p>
        <div className={isHovered ? 'block' : 'hidden'}>
          <input type="color" value={headerBgColor} onChange={handleColorChange} className="px-2 py-1 cursor-pointer bg-blue-500 text-white rounded-md mr-2" />
          <button onClick={toggleView} className="px-2 py-1 bg-blue-500 text-white rounded-md">
            {view === 'card' ? <FiList /> : <FiGrid />}
          </button>
        </div>
      </div>

      <div className="p-4">
        {view === 'card' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {interests?.map((interest, index) => (
              <div key={index} className="rounded-lg bg-gray-50 p-4 text-center">
                <p className="text-gray-700 font-semibold">{interest}</p>
              </div>
            ))}
          </div>
        ) : (
          <ul className="list-disc ml-8">
            {interests?.map((interest, index) => (
              <li key={index} className="text-gray-600 py-2">{interest}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Interests;