"use client";

import { useState } from 'react';
import { FiColorPicker } from 'react-icons/fi';

const PersonalDetailCard = ({ personalDetail, setting }) => {
  const [headerBgColor, setHeaderBgColor] = useState('#4CAF50'); // Initial color
  const [isHovered, setIsHovered] = useState(false);

  const { fatherName, motherName, dob, religion, nationality, maritalStatus, bloodGroup, height } = personalDetail || {};

  const defaultSettings = {
    showPersonalDetail: false,
    showEducation: true,
    showWorkExperience: true,
    ...setting 
  };


  const handleColorChange = (event) => {
    setHeaderBgColor(event.target.value);
  };

  if(defaultSettings?.showPersonalDetail) {
    return (
      <div style={{ pageBreakAfter: 'always', pageBreakInside: 'avoid' }} className="container rounded-md py-2 my-2 mx-auto justify-center items-center relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <div className={`bg-blue-300 text-gray-900 my-2 py-2 px-2 shadow-sm border-2 border-l-gray-900`} style={{ backgroundColor: headerBgColor }}>
          <p className="text-xl font-semibold">Personal Details</p>
          
          {isHovered && (
          <input 
            type="color" 
            value={headerBgColor} 
            onChange={handleColorChange} 
            className="absolute right-4 top-4 cursor-pointer" 
          />
          
          )}
        </div>
  
        <div className="bg-white dark:bg-gray-900 rounded-md p-6">
          <table className="w-full text-left">
            <tbody>
              <tr>
                <th className="pb-2 text-gray-600 dark:text-gray-300">Father's Name:</th>
                <td className="pb-2">{fatherName}</td>
              </tr>
              <tr>
                <th className="pb-2 text-gray-600 dark:text-gray-300">Mother's Name:</th>
                <td className="pb-2">{motherName}</td>
              </tr>
              <tr>
                <th className="pb-2 text-gray-600 dark:text-gray-300">Date of Birth:</th>
                <td className="pb-2">{dob}</td>
              </tr>
              <tr>
                <th className="pb-2 text-gray-600 dark:text-gray-300">Religion:</th>
                <td className="pb-2">{religion}</td>
              </tr>
              <tr>
                <th className="pb-2 text-gray-600 dark:text-gray-300">Nationality:</th>
                <td className="pb-2">{nationality}</td>
              </tr>
              <tr>
                <th className="pb-2 text-gray-600 dark:text-gray-300">Marital Status:</th>
                <td className="pb-2">{maritalStatus}</td>
              </tr>
              <tr>
                <th className="pb-2 text-gray-600 dark:text-gray-300">Blood Group:</th>
                <td className="pb-2">{bloodGroup}</td>
              </tr>
              <tr>
                <th className="pb-2 text-gray-600 dark:text-gray-300">Height:</th>
                <td className="pb-2">{height}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

 
};

export default PersonalDetailCard;