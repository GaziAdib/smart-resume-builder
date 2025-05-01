"use client";

import moment from "moment";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const ExperienceCard = ({ experience }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedExperience, setEditedExperience] = useState({
    ...experience,
    jobResposibilities: experience.jobResposibilities ? [...experience.jobResposibilities] : []
  });
  const [newResponsibility, setNewResponsibility] = useState("");
  const router = useRouter();

  // Reset edited experience when experience prop changes
  useEffect(() => {
    setEditedExperience({
      ...experience,
      jobResposibilities: experience.jobResposibilities ? [...experience.jobResposibilities] : []
    });
  }, [experience]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedExperience(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleResponsibilityChange = (e, index) => {
    const updatedResponsibilities = [...editedExperience.jobResposibilities];
    updatedResponsibilities[index] = e.target.value;
    setEditedExperience(prev => ({
      ...prev,
      jobResposibilities: updatedResponsibilities
    }));
  };

  const addResponsibility = () => {
    if (newResponsibility.trim()) {
      setEditedExperience(prev => ({
        ...prev,
        jobResposibilities: [...prev.jobResposibilities, newResponsibility.trim()]
      }));
      setNewResponsibility("");
    }
  };

  const removeResponsibility = (index) => {
    const updatedResponsibilities = editedExperience.jobResposibilities.filter((_, i) => i !== index);
    setEditedExperience(prev => ({
      ...prev,
      jobResposibilities: updatedResponsibilities
    }));
  };

  const handleSave = async () => {
    try {
      // Prepare payload with proper data types
      const payload = {
        ...editedExperience,
        startDate: new Date(editedExperience.startDate).toISOString(),
        endDate: editedExperience.endDate ? new Date(editedExperience.endDate).toISOString() : null,
        jobResposibilities: editedExperience.jobResposibilities.filter(r => r.trim() !== "")
      };

      const res = await fetch(`/api/user/resume/update-resume/experience/${experience.id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error('Failed to update experience');
      }

      const data = await res.json();
      
      // Update local state with the response data
      setEditedExperience({
        ...data.data,
        jobResposibilities: data.data.jobResposibilities ? [...data.data.jobResposibilities] : []
      });

      toast.success('Experience updated successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      
      setIsEditing(false);
      router.refresh();

    } catch (error) {
      console.error('Error updating experience:', error);
      toast.error('Failed to update experience', {
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
  };

  const handleCancel = () => {
    setEditedExperience({
      ...experience,
      jobResposibilities: experience.jobResposibilities ? [...experience.jobResposibilities] : []
    });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white border-l-2 border-l-gray-200 dark:bg-gray-900 dark:border-l-gray-700 rounded-md py-2 px-3 mt-2">
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Job Title</label>
          <input
            type="text"
            name="jobTitle"
            value={editedExperience.jobTitle || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:text-white dark:bg-gray-800 dark:border-gray-700"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Company Name</label>
          <input
            type="text"
            name="companyName"
            value={editedExperience.companyName || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:text-white dark:bg-gray-800 dark:border-gray-700"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={moment(editedExperience.startDate).format("YYYY-MM-DD")}
              onChange={handleChange}
              className="w-full p-2 border rounded dark:text-white dark:bg-gray-800 dark:border-gray-700"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">End Date</label>
            <input
              type="date"
              name="endDate"
              value={editedExperience.endDate ? moment(editedExperience.endDate).format("YYYY-MM-DD") : ''}
              onChange={handleChange}
              className="w-full p-2 border rounded dark:text-white dark:bg-gray-800 dark:border-gray-700"
              placeholder="Leave empty for Present"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Responsibilities</label>
          <div className="space-y-2">
            {editedExperience.jobResposibilities?.map((responsibility, index) => (
              <div key={index} className="flex  items-center gap-2">
                <input
                  type="text"
                  value={responsibility}
                  onChange={(e) => handleResponsibilityChange(e, index)}
                  className="flex-1 p-2 border rounded dark:text-white dark:bg-gray-800 dark:border-gray-700"
                />
                <button
                  onClick={() => removeResponsibility(index)}
                  className="p-2 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newResponsibility}
                onChange={(e) => setNewResponsibility(e.target.value)}
                placeholder="Add new responsibility"
                className="flex-1 p-2 border rounded dark:text-white dark:bg-gray-800 dark:border-gray-700"
              />
              <button
                onClick={addResponsibility}
                className="p-2 text-green-500 hover:text-green-700"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="bg-white border-l-2 border-l-gray-200 dark:bg-gray-900 dark:border-l-gray-700 rounded-md py-2 px-3 mt-2"
      onDoubleClick={handleDoubleClick}
      style={{ cursor: 'pointer' }}
    >
      <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
        {editedExperience?.jobTitle?.toUpperCase()}
      </h2>
      <p className="text-gray-700 mb-1">
        <span className="font-semibold dark:text-gray-300">({editedExperience?.companyName})</span> 
      </p>

      <div className="flex flex-col sm:flex-row justify-between">
        <p className="text-gray-600 mb-1 dark:text-gray-300">
          <span className="font-semibold dark:text-gray-300">Duration:</span> {moment(editedExperience?.startDate).format("DD MMM, YYYY")} - {editedExperience?.endDate ? moment(editedExperience?.endDate).format("DD MMM, YYYY") : 'Present'}
        </p>
      </div>
      <div>
        <p className="text-gray-600 mb-1 font-semibold dark:text-gray-300">Responsibilities:</p>
        <ul className="list-disc ml-6">
          {editedExperience?.jobResposibilities?.map((responsibility, index) => (
            <li key={index} className="text-gray-600 dark:text-gray-300">{responsibility}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExperienceCard;








// "use client";

// import moment from "moment";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { toast } from "react-toastify";

// const ExperienceCard = ({ experience }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedExperience, setEditedExperience] = useState({ ...experience });
//   const [newResponsibility, setNewResponsibility] = useState([]);

//   const handleDoubleClick = () => {
//     setIsEditing(true);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditedExperience(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleResponsibilityChange = (e, index) => {
//     const updatedResponsibilities = [...editedExperience.jobResposibilities];
//     updatedResponsibilities[index] = e.target.value;
//     setEditedExperience(prev => ({
//       ...prev,
//       jobResposibilities: updatedResponsibilities
//     }));
//   };

//   const addResponsibility = () => {
//     if (newResponsibility.trim()) {
//       setEditedExperience(prev => ({
//         ...prev,
//         jobResposibilities: [...prev.jobResposibilities, newResponsibility]
//       }));
//       setNewResponsibility("");
//     }
//   };

//   const removeResponsibility = (index) => {
//     const updatedResponsibilities = editedExperience.jobResposibilities.filter((_, i) => i !== index);
//     setEditedExperience(prev => ({
//       ...prev,
//       jobResposibilities: updatedResponsibilities
//     }));
//   };

//   const handleSave = async () => {

//     console.log('DATA', editedExperience)
//     try {
//       const res = await fetch(`/api/user/resume/update-resume/experience/${experience.id}`, {
//         method: 'PUT',
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(editedExperience)
//       });

//       if (!res.ok) {
//         throw new Error('Failed to update experience');
//       }

//       const data = await res.json();
      
//       // // Refresh the data
//       // if (refreshData) {
//       //   await refreshData(); // Call the refresh function if provided
//       // } else {
//       //   router.refresh(); // Fallback to page refresh
//       // }

//       setEditedExperience(data.data)
//       toast.success('Experience updated successfully!', {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//       });
      
//       setIsEditing(false);

//     } catch (error) {
//       console.error('Error updating experience:', error);
//       toast.error('Failed to update experience', {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//       });
//     }
//   };

//   const handleCancel = () => {
//     setEditedExperience({ ...experience });
//     setIsEditing(false);
//   };

//   if (isEditing) {
//     return (
//       <div className="bg-white border-l-2 border-l-gray-200 dark:bg-gray-900 dark:border-l-gray-700 rounded-md py-2 px-3 mt-2">
//         <div className="mb-4">
//           <label className="block text-gray-700 dark:text-gray-300 mb-1">Job Title</label>
//           <input
//             type="text"
//             name="jobTitle"
//             value={editedExperience.jobTitle || ''}
//             onChange={handleChange}
//             className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 dark:text-gray-300 mb-1">Company Name</label>
//           <input
//             type="text"
//             name="companyName"
//             value={editedExperience.companyName || ''}
//             onChange={handleChange}
//             className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
//           />
//         </div>

//         <div className="grid grid-cols-2 gap-4 mb-4">
//           <div>
//             <label className="block text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
//             <input
//               type="date"
//               name="startDate"
//               value={moment(editedExperience.startDate).format("YYYY-MM-DD")}
//               onChange={handleChange}
//               className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 dark:text-gray-300 mb-1">End Date</label>
//             <input
//               type="date"
//               name="endDate"
//               value={editedExperience.endDate ? moment(editedExperience.endDate).format("YYYY-MM-DD") : ''}
//               onChange={handleChange}
//               className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
//               placeholder="Leave empty for Present"
//             />
//           </div>
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 dark:text-gray-300 mb-1">Responsibilities</label>
//           <div className="space-y-2">
//             {editedExperience.jobResposibilities?.map((responsibility, index) => (
//               <div key={index} className="flex items-center gap-2">
//                 <input
//                   type="text"
//                   value={responsibility}
//                   onChange={(e) => handleResponsibilityChange(e, index)}
//                   className="flex-1 p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
//                 />
//                 <button
//                   onClick={() => removeResponsibility(index)}
//                   className="p-2 text-red-500 hover:text-red-700"
//                 >
//                   ×
//                 </button>
//               </div>
//             ))}
//             <div className="flex items-center gap-2">
//               <input
//                 type="text"
//                 value={newResponsibility}
//                 onChange={(e) => setNewResponsibility(e.target.value)}
//                 placeholder="Add new responsibility"
//                 className="flex-1 p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
//               />
//               <button
//                 onClick={addResponsibility}
//                 className="p-2 text-green-500 hover:text-green-700"
//               >
//                 +
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="flex justify-end space-x-2">
//           <button
//             onClick={handleCancel}
//             className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-white"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSave}
//             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div 
//       className="bg-white border-l-2 border-l-gray-200 dark:bg-gray-900 dark:border-l-gray-700 rounded-md py-2 px-3 mt-2"
//       onDoubleClick={handleDoubleClick}
//       style={{ cursor: 'pointer' }}
//     >
//       <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
//         {editedExperience?.jobTitle?.toUpperCase()}
//       </h2>
//       <p className="text-gray-700 mb-1">
//         <span className="font-semibold dark:text-gray-300">({editedExperience?.companyName})</span> 
//       </p>

//       <div className="flex flex-col sm:flex-row justify-between">
//         <p className="text-gray-600 mb-1 dark:text-gray-300">
//           <span className="font-semibold dark:text-gray-300">Duration:</span> {moment(editedExperience?.startDate).format("DD MMM, YYYY")} - {editedExperience?.endDate ? moment(experience?.endDate).format("DD MMM, YYYY") : 'Present'}
//         </p>
//       </div>
//       <div>
//         <p className="text-gray-600 mb-1 font-semibold dark:text-gray-300">Responsibilities:</p>
//         <ul className="list-disc ml-6">
//           {editedExperience?.jobResposibilities?.map((responsibility, index) => (
//             <li key={index} className="text-gray-600 dark:text-gray-300">{responsibility}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default ExperienceCard;







// import moment from "moment";

// const ExperienceCard = ({experience}) => {

//   const {jobTitle, companyName, jobResposibilities, startDate, endDate } = experience || {};

//   return (
//     <div className="bg-white border-l-2 border-l-gray-200 dark:bg-gray-900 dark:border-l-gray-700 rounded-md py-2 px-3 mt-2">
//       <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{jobTitle?.toUpperCase()}</h2>
//       <p className="text-gray-700 mb-1">
//         <span className="font-semibold dark:text-gray-300">({companyName})</span> 
//       </p>

//       <div className="flex flex-col sm:flex-row justify-between">
//         <p className="text-gray-600 mb-1 dark:text-gray-300">
//           <span className="font-semibold dark:text-gray-300">Duration:</span> {moment(startDate).format("DD MMM, YYYY")} - {endDate ? moment(endDate).format("DD MMM, YYYY") : 'Present'}
//         </p>
//       </div>
//       <div>
        
//       <p className="text-gray-600 mb-1 font-semibold dark:text-gray-300">Responsibilities:</p>
//       <ul className="list-disc ml-6">
//         {jobResposibilities?.map((responsibility, index) => (
//           <li key={index} className="text-gray-600 dark:text-gray-300">{responsibility}</li>
//         ))}
//       </ul>
//     </div>
//     </div>
//   )
// }

// export default ExperienceCard