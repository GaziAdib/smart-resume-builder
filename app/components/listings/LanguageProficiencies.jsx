"use client";
import { useState } from 'react';
import { FiGrid, FiList } from 'react-icons/fi'; // Importing icons from React Icons
import { toast } from 'react-toastify';

const LanguageProficiencies = ({ languageProficiencies, resumeId }) => {
  const [view, setView] = useState('card');
  const [headerBgColor, setHeaderBgColor] = useState('#9bedff'); // Initial color
  const [isHovered, setIsHovered] = useState(false);
  const [editableIndex, setEditableIndex] = useState(null);
  const [editableValue, setEditableValue] = useState("");
  let   [languageProficiencys, setLanguageProficiencies] = useState(languageProficiencies);

  const toggleView = () => {
    setView(prevView => (prevView === 'card' ? 'list' : 'card'));
  };

  const handleColorChange = (event) => {
    setHeaderBgColor(event.target.value);
  };

  const handleDoubleClick = (index, value) => {
    setEditableIndex(index);
    setEditableValue(value);
  };

  const handleInputChange = (event) => {
    setEditableValue(event.target.value);
  };

 const handleUpdateLanguageProficies = async (index) => {

  
  if (editableValue === '') {
    toast.error('You Must Add Some Data To Update!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
  });
    setEditableIndex(null);
    setEditableValue("");
    return;
}

  try {
    const updatedProficiencies = [...languageProficiencies];
    updatedProficiencies[index] = editableValue;

    const response = await fetch(`/api/user/resume/update-resume/language-proficiency/${resumeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ languageProficiencies: updatedProficiencies }),
    });

    if (!response.ok) {
      throw new Error('Failed to update language proficiency');
    }

    // Assuming the response returns the updated proficiencies
    const res = await response.json();
    // Update the state with the updated proficiencies from the server
    setLanguageProficiencies(res.languageProficiencies);
    setEditableIndex(null);
  } catch (error) {
    console.error('Failed to update language proficiency:', error);
  }
 };



  const handleKeyPress = async (event, index) => {
    if (event.key === 'Enter') {
      event.preventDefault();  // Prevents new line creation on Enter
     await handleUpdateLanguageProficies(index);
    }
  };


  return (
    <div
      style={{ pageBreakAfter: 'always', pageBreakInside: 'avoid' }}
      className="container rounded-md py-2 my-2 mx-auto justify-center items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`bg-blue-300 text-gray-900 my-4 py-2 px-2 shadow-sm border-2 border-l-gray-900 flex justify-between items-center`}
        style={{ backgroundColor: headerBgColor }}
      >
        <p className="text-xl font-semibold">Language Proficiencies</p>
        <div className={isHovered ? 'block' : 'hidden'}>
          <input
            type="color"
            value={headerBgColor}
            onChange={handleColorChange}
            className="cursor-pointer mr-2 px-2 py-1 bg-blue-500 text-white rounded-md"
          />
          <button onClick={toggleView} className="px-2 py-1 bg-blue-500 text-white rounded-md">
            {view === 'card' ? <FiList /> : <FiGrid />}
          </button>
        </div>
      </div>

      {view === 'card' ? (
        <ul className="list-disc ml-8">
          {languageProficiencys?.map((languageProficiency, index) => (
            <li key={index} className="text-gray-600 dark:text-gray-200 py-0.5" onDoubleClick={() => handleDoubleClick(index, languageProficiency)}>
              {editableIndex === index ? (
                <input
                  type="text"
                  value={editableValue}
                  onChange={handleInputChange}
                  onKeyDown={(event) => handleKeyPress(event,index)}
                  className="border rounded px-2 py-1"
                />
              ) : (
                languageProficiency
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {languageProficiencys?.map((languageProficiency, index) => (
            <div
              key={index}
              className="rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-center"
              onDoubleClick={() => handleDoubleClick(index, languageProficiency)}
            >
              {editableIndex === index ? (
                <input
                  type="text"
                  value={editableValue}
                  onChange={handleInputChange}
                  onKeyDown={(event) => handleKeyPress(event, index)}
                  className="border rounded px-2 py-1"
                />
              ) : (
                <p className="text-gray-700 font-semibold dark:text-gray-200">{languageProficiency}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageProficiencies;