"use client";

import { useState } from 'react';
import { FiColorPicker } from 'react-icons/fi';

const PersonalDetailCard = ({ personalDetail, setting }) => {
  const [headerBgColor, setHeaderBgColor] = useState('#4CAF50'); // Initial color
  const [isHovered, setIsHovered] = useState(false);

  const { fatherName, motherName, dob, religion, nationality, maritalStatus, bloodGroup, height } = personalDetail || {};

  const handleColorChange = (event) => {
    setHeaderBgColor(event.target.value);
  };

  if(setting?.showPersonalDetail) {
    return (
      <div style={{ pageBreakAfter: 'always', pageBreakInside: 'avoid' }} className="container rounded-md py-2 my-2 mx-auto justify-center items-center relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <div className={`bg-blue-300 text-gray-900 my-2 py-2 px-2 shadow-sm border-2 border-l-gray-900`} style={{ backgroundColor: headerBgColor }}>
          <p className="text-xl font-semibold">Personal Details</p>
          {/* Conditionally render color input when hovered */}
          {isHovered && (
          <input 
            type="color" 
            value={headerBgColor} 
            onChange={handleColorChange} 
            className="absolute right-4 top-4 cursor-pointer" 
          />
          
          )}
        </div>
  
        <div className="bg-white rounded-md p-6">
          <table className="w-full text-left">
            <tbody>
              <tr>
                <th className="pb-2 text-gray-600">Father's Name:</th>
                <td className="pb-2">{fatherName}</td>
              </tr>
              <tr>
                <th className="pb-2 text-gray-600">Mother's Name:</th>
                <td className="pb-2">{motherName}</td>
              </tr>
              <tr>
                <th className="pb-2 text-gray-600">Date of Birth:</th>
                <td className="pb-2">{dob}</td>
              </tr>
              <tr>
                <th className="pb-2 text-gray-600">Religion:</th>
                <td className="pb-2">{religion}</td>
              </tr>
              <tr>
                <th className="pb-2 text-gray-600">Nationality:</th>
                <td className="pb-2">{nationality}</td>
              </tr>
              <tr>
                <th className="pb-2 text-gray-600">Marital Status:</th>
                <td className="pb-2">{maritalStatus}</td>
              </tr>
              <tr>
                <th className="pb-2 text-gray-600">Blood Group:</th>
                <td className="pb-2">{bloodGroup}</td>
              </tr>
              <tr>
                <th className="pb-2 text-gray-600">Height:</th>
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