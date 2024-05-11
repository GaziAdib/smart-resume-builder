"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FiGrid, FiList } from 'react-icons/fi'; // Importing icons from React Icons
import { toast } from 'react-toastify'; // Import toast for notifications

const Interests = ({ interests, resumeId }) => {

  const router = useRouter();


  const [view, setView] = useState('card');
  const [headerBgColor, setHeaderBgColor] = useState('#9bedff'); // Initial color
  const [isHovered, setIsHovered] = useState(false);
  const [editedInterestIndex, setEditedInterestIndex] = useState(null); // Track the index of the interest being edited
  const [editedOldInterestName, setEditedOldInterestName] = useState('');
  const [editedNewInterestName, setEditedNewInterestName] = useState('');

  const toggleView = () => {
    setView(prevView => (prevView === 'card' ? 'list' : 'card'));
  };

  const handleColorChange = (event) => {
    setHeaderBgColor(event.target.value);
  };

  const handleInterestClick = (index, interest) => {
    setEditedInterestIndex(index);
    setEditedOldInterestName(interest);
  };

  const handleInterestChange = (event) => {
    setEditedNewInterestName(event.target.value);
  };

  const handleInterestEdit = async (index) => {
   
    const updatedInterests = [...interests];
    updatedInterests[index] = editedNewInterestName;
    // Reset the edited interest state
    //setEditedInterestIndex(null);
    //setEditedInterestName('');

    try {
      const res = await fetch(`/api/user/resume/update-resume/interests/${resumeId}`, {
          method: 'PUT',
          headers: {
              "Content-Type": "application/json"
          },
          cache: 'no-cache',
          body: JSON.stringify({newInterestName: editedNewInterestName, oldInterestName: editedOldInterestName})
      })

      if (!res.ok) {
          console.log('There is some problem in getting response');
      }

      if (res.ok) {
          toast.success('Interests updated!', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
          });

          setTimeout(() => {
            window.location.reload();
          }, 500);

          // Reset the edited interest state
      setEditedInterestIndex(null);
      setEditedOldInterestName('');
      setEditedNewInterestName('');
      
    }
  
    } catch (error) {
        console.log('error Updating Interests', error)
    }

   
      

    
  };

  const handleKeyPress = async (event, index) => {
    if (event.key === 'Enter') {
      await handleInterestEdit(index);
    }
  };

  return (
    <div className="container rounded-md my-4 mx-auto bg-white dark:bg-gray-900">
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
              <div key={index} className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4 text-center" onDoubleClick={() => handleInterestClick(index, interest)}>
                {editedInterestIndex === index ? (
                  <input
                    type="text"
                    defaultValue={editedOldInterestName}
                    onChange={handleInterestChange}
                    onKeyPress={(event) => handleKeyPress(event, index)}
                    onBlur={() => handleInterestEdit(index)}
                    className="text-gray-700 dark:text-gray-200 font-semibold outline-none"
                    autoFocus
                  />
                ) : (
                  <p className="text-gray-700 font-semibold dark:text-gray-200">{interest}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <ul className="list-disc ml-8">
            {interests?.map((interest, index) => (
              <li key={index} className="text-gray-600 py-2 dark:text-gray-200" onDoubleClick={() => handleInterestClick(index, interest)}>
                {editedInterestIndex === index ? (
                  <input
                    type="text"
                    defaultValue={editedOldInterestName}
                    onChange={handleInterestChange}
                    onKeyPress={(event) => handleKeyPress(event, index)}
                    onBlur={() => handleInterestEdit(index)}
                    className="text-gray-700 font-semibold outline-none"
                    autoFocus
                  />
                ) : (
                  interest
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Interests;


// "use client";

// import { useState } from 'react';
// import { FiGrid, FiList } from 'react-icons/fi'; // Importing icons from React Icons

// const Interests = ({ interests }) => {
//   const [view, setView] = useState('card');
//   const [headerBgColor, setHeaderBgColor] = useState('#9bedff'); // Initial color
//   const [isHovered, setIsHovered] = useState(false);

//   const toggleView = () => {
//     setView(prevView => (prevView === 'card' ? 'list' : 'card'));
//   };

//   const handleColorChange = (event) => {
//     setHeaderBgColor(event.target.value);
//   };

//   return (
//     <div className="container rounded-md my-4 mx-auto bg-white">
//       <div className={`bg-blue-300 text-gray-900 py-2 px-4 border-b border-l-gray-900 flex justify-between items-center`} style={{ backgroundColor: headerBgColor }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
//         <p className="text-lg font-semibold">My Interests</p>
//         <div className={isHovered ? 'block' : 'hidden'}>
//           <input type="color" value={headerBgColor} onChange={handleColorChange} className="px-2 py-1 cursor-pointer bg-blue-500 text-white rounded-md mr-2" />
//           <button onClick={toggleView} className="px-2 py-1 bg-blue-500 text-white rounded-md">
//             {view === 'card' ? <FiList /> : <FiGrid />}
//           </button>
//         </div>
//       </div>

//       <div className="p-4">
//         {view === 'card' ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//             {interests?.map((interest, index) => (
//               <div key={index} className="rounded-lg bg-gray-50 p-4 text-center">
//                 <p className="text-gray-700 font-semibold">{interest}</p>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <ul className="list-disc ml-8">
//             {interests?.map((interest, index) => (
//               <li key={index} className="text-gray-600 py-2">{interest}</li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Interests;