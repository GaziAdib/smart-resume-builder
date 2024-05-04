"use client";

import { useState } from 'react';
import { FiGrid, FiList } from 'react-icons/fi'; // Importing icons from React Icons
import { toast } from 'react-toastify';

const Skills = ({ skills }) => {
  const [view, setView] = useState('card');
  const [headerBgColor, setHeaderBgColor] = useState('#9bedff'); // Initial color
  const [isHovered, setIsHovered] = useState(false);
  const [editedSkillIndex, setEditedSkillIndex] = useState(null); // Track the index of the skill being edited
  const [editedSkillName, setEditedSkillName] = useState('');
  const [skillId, setSkillId] = useState('');

  const toggleView = () => {
    setView(prevView => (prevView === 'card' ? 'list' : 'card'));
  };

  const handleColorChange = (event) => {
    setHeaderBgColor(event.target.value);
  };

  const handleSkillClick = (index, name, skillId) => {
    setEditedSkillIndex(index);
    setEditedSkillName(name);
    setSkillId(skillId);
  };

  const handleSkillChange = (event) => {
    setEditedSkillName(event.target.value);
  };

  const handleSkillEdit = async (index) => {
    // Update the skill name in the skills array
    const updatedSkills = [...skills];
    updatedSkills[index].name = editedSkillName;
    // Reset the edited skill state
    setEditedSkillIndex(null);
    setEditedSkillName('');

    

    try {
      const res = await fetch(`/api/user/resume/update-resume/skill/${skillId}`, {
          method: 'PUT',
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({name: editedSkillName})
      })

      if (!res.ok) {
          console.log('There is some problem in getting response');
      }

      if (res.ok) {
          toast.success('Skill updated!', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
          });
      
      }
  
    } catch (error) {
        console.log('error Updating Skill', error)
    }

     // Reset the edited skill state
     setEditedSkillIndex(null);
     setEditedSkillName('');
  };

  const handleKeyPress = async (event, index) => {
    if (event.key === 'Enter') {
      await handleSkillEdit(index);
    }
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
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2">
          {skills?.map((skill, index) => (
            <div key={index} className="bg-gray-50 p-2 rounded-md" onDoubleClick={() => handleSkillClick(index, skill.name, skill.id)}>
              {editedSkillIndex === index ? (
                <input
                  type="text"
                  value={editedSkillName}
                  onChange={handleSkillChange}
                  onKeyPress={(event) => handleKeyPress(event, index)}
                  onBlur={() => handleSkillEdit(index)}
                  className="text-gray-700 font-semibold text-center outline-none"
                  autoFocus
                />
              ) : (
                <p className="text-gray-700 font-semibold text-center">{skill.name}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <ul className="list-disc ml-8">
          {skills?.map((skill, index) => (
            <li key={index} className="text-gray-600 py-0.5" onDoubleClick={() => handleSkillClick(index, skill.name, skill.id)}>
              {editedSkillIndex === index ? (
                <input
                  type="text"
                  value={editedSkillName}
                  onChange={handleSkillChange}
                  onKeyPress={(event) => handleKeyPress(event, index)}
                  onBlur={() => handleSkillEdit(index)}
                  className="text-gray-700 font-semibold outline-none"
                  autoFocus
                />
              ) : (
                skill.name
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Skills;













// "use client";

// import { useState } from 'react';
// import { FiGrid, FiList } from 'react-icons/fi'; // Importing icons from React Icons

// const Skills = ({ skills }) => {
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
//     <div className="container rounded-md py-2 my-2 mx-auto justify-center items-center" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
//       <div className={`bg-blue-300 text-gray-900 my-2 py-2 px-2 shadow-sm border-2 border-l-gray-900 flex justify-between items-center`} style={{ backgroundColor: headerBgColor }}>
//         <p className="text-xl font-semibold">My Skills</p>
//         <div className={isHovered ? 'block' : 'hidden'}>
//           <input type="color" value={headerBgColor} onChange={handleColorChange} className="mr-2 px-2 py-1 cursor-pointer bg-blue-500 text-white rounded-md" />
//           <button onClick={toggleView} className="px-2 py-1 bg-blue-500 text-white rounded-md">
//             {view === 'card' ? <FiList /> : <FiGrid />}
//           </button>
//         </div>
//       </div>

//       {view === 'card' ? (
//         <div className="grid grid-cols-3 gap-2">
//           {skills?.map((skill, index) => (
//             <div key={index} className="bg-gray-50 p-2 rounded-md">
//               <p className="text-gray-700 font-semibold text-center">{skill.name}</p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <ul className="list-disc ml-8">
//           {skills?.map((skill, index) => (
//             <li key={index} className="text-gray-600 py-0.5">{skill.name}</li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Skills;