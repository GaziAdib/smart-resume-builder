"use client";
import { useState } from 'react';
import { FiGrid, FiList } from 'react-icons/fi'; // Importing icons from React Icons
import { toast } from 'react-toastify';

const Interests = ({ interests, resumeId }) => {
  const [view, setView] = useState('card');
  const [headerBgColor, setHeaderBgColor] = useState('#ffffff');
  const [isHovered, setIsHovered] = useState(false);
  const [editableIndex, setEditableIndex] = useState(null);
  const [editableValue, setEditableValue] = useState("");
  let   [myInterests, setMyInterests] = useState(interests);

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

 const handleUpdateInterests = async (index) => {

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
    const updatedInterests = [...interests];
    updatedInterests[index] = editableValue;

    const response = await fetch(`/api/user/resume/update-resume/interests/${resumeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ interests: updatedInterests }),
    });

    if (!response.ok) {
      throw new Error('Failed to update Interests');
    }

    const res = await response.json();
   
    setMyInterests(res.interests);
    setEditableIndex(null);

  } catch (error) {
    console.error('Failed to update interests:', error);
  }
 };

  const handleKeyPress = async (event, index) => {
    if (event.key === 'Enter') {
      event.preventDefault();  // Prevents new line creation on Enter
     await handleUpdateInterests(index);
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
        <p className="text-xl font-semibold">My Interests</p>
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
          {myInterests?.map((interest, index) => (
            <li key={index} className="text-gray-600 dark:text-gray-200 py-0.5" onDoubleClick={() => handleDoubleClick(index, interest)}>
              {editableIndex === index ? (
                <input
                  type="text"
                  value={editableValue}
                  onChange={handleInputChange}
                  onKeyDown={(event) => handleKeyPress(event,index)}
                  className="border rounded px-2 py-1"
                />
              ) : (
                interest
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {myInterests?.map((interest, index) => (
            <div
              key={index}
              className="rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-center"
              onDoubleClick={() => handleDoubleClick(index, interest)}
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
                <p className="text-gray-700 font-semibold dark:text-gray-200">{interest}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Interests;


