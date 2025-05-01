"use client";

import moment from "moment";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const ProjectCard = ({ project }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProject, setEditedProject] = useState({
    ...project,
    projectAchievements: project.projectAchievements ? [...project.projectAchievements] : []
  });
  const [newAchievement, setNewAchievement] = useState("");
  const router = useRouter();

  useEffect(() => {
    setEditedProject({
      ...project,
      projectAchievements: project.projectAchievements ? [...project.projectAchievements] : []
    });
  }, [project]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProject(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAchievementChange = (e, index) => {
    const updatedAchievements = [...editedProject.projectAchievements];
    updatedAchievements[index] = e.target.value;
    setEditedProject(prev => ({
      ...prev,
      projectAchievements: updatedAchievements
    }));
  };

  const addAchievement = () => {
    if (newAchievement.trim()) {
      setEditedProject(prev => ({
        ...prev,
        projectAchievements: [...prev.projectAchievements, newAchievement.trim()]
      }));
      setNewAchievement("");
    }
  };

  const removeAchievement = (index) => {
    const updatedAchievements = editedProject.projectAchievements.filter((_, i) => i !== index);
    setEditedProject(prev => ({
      ...prev,
      projectAchievements: updatedAchievements
    }));
  };

  const handleSave = async () => {
    try {
      const payload = {
        ...editedProject,
        startDate: new Date(editedProject.startDate).toISOString(),
        endDate: editedProject.endDate ? new Date(editedProject.endDate).toISOString() : null,
        projectAchievements: editedProject.projectAchievements.filter(a => a.trim() !== "")
      };

      const res = await fetch(`/api/user/resume/update-resume/project/${project.id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error('Failed to update project');
      }

      const data = await res.json();
      
      setEditedProject({
        ...data.data,
        projectAchievements: data?.data?.projectAchievements ? [...data.data.projectAchievements] : []
      });

      toast.success('Project updated successfully!', {
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
      console.error('Error updating project:', error);
      toast.error('Failed to update project', {
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
    setEditedProject({
      ...project,
      projectAchievements: project.projectAchievements ? [...project.projectAchievements] : []
    });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white dark:bg-gray-900 border-l-2 border-l-gray-300 dark:border-l-gray-700 rounded-lg shadow-sm py-2 px-4 mb-4 w-full mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Project Title</label>
          <input
            type="text"
            name="projectTitle"
            value={editedProject?.projectTitle || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:text-white dark:bg-gray-800 dark:border-gray-700"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Live Demo URL</label>
            <input
              type="url"
              name="projectLiveLink"
              value={editedProject?.projectLiveLink || ''}
              onChange={handleChange}
              className="w-full p-2 border rounded dark:text-white dark:bg-gray-800 dark:border-gray-700"
              placeholder="https://example.com"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">GitHub URL</label>
            <input
              type="url"
              name="projectGitLink"
              value={editedProject?.projectGitLink || ''}
              onChange={handleChange}
              className="w-full p-2 border rounded dark:text-white dark:bg-gray-800 dark:border-gray-700"
              placeholder="https://github.com/username/repo"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={moment(editedProject?.startDate).format("YYYY-MM-DD")}
              onChange={handleChange}
              className="w-full p-2 border rounded dark:text-white dark:bg-gray-800 dark:border-gray-700"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">End Date</label>
            <input
              type="date"
              name="endDate"
              value={editedProject?.endDate ? moment(editedProject?.endDate).format("YYYY-MM-DD") : ''}
              onChange={handleChange}
              className="w-full p-2 border rounded dark:text-white dark:bg-gray-800 dark:border-gray-700"
              placeholder="Leave empty if ongoing"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Achievements</label>
          <div className="space-y-2">
            {editedProject?.projectAchievements?.map((achievement, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={achievement}
                  onChange={(e) => handleAchievementChange(e, index)}
                  className="flex-1 p-2 border rounded dark:text-white dark:bg-gray-800 dark:border-gray-700"
                />
                <button
                  onClick={() => removeAchievement(index)}
                  className="p-2 text-red-500 hover:text-red-700 dark:hover:text-red-500"
                >
                  ×
                </button>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newAchievement}
                onChange={(e) => setNewAchievement(e.target.value)}
                placeholder="Add new achievement"
                className="flex-1 p-2 border rounded dark:text-white dark:bg-gray-800 dark:border-gray-700"
              />
              <button
                onClick={addAchievement}
                className="p-2 text-green-500 hover:text-green-700 dark:hover:text-green-500"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="bg-white dark:bg-gray-900 border-l-2 border-l-gray-300 dark:border-l-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 py-2 px-4 mb-4 w-full mx-auto"
      onDoubleClick={handleDoubleClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 flex-wrap">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100">
            {editedProject.projectTitle?.toUpperCase()}
          </h2>
          <div className="flex gap-2">
            {editedProject.projectLiveLink && (
              <a
                href={editedProject.projectLiveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm sm:text-base font-medium text-blue-500 dark:text-blue-400 hover:underline transition-colors duration-200"
              >
                Live Demo
              </a>
            )}
            {editedProject.projectGitLink && (
              <a
                href={editedProject.projectGitLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm sm:text-base font-medium text-gray-600 dark:text-gray-300 hover:underline transition-colors duration-200"
              >
                GitHub
              </a>
            )}
          </div>
        </div>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 whitespace-nowrap">
          <span className="font-medium">Duration: </span>
          {moment(editedProject.startDate).format("DD MMM, YYYY")} -{" "}
          {editedProject.endDate ? moment(editedProject.endDate).format("DD MMM, YYYY") : "Present"}
        </p>
      </div>

      {editedProject.projectAchievements?.length > 0 && (
        <div className="mt-2">
          <p className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-200 mb-1">
            Achievements:
          </p>
          <ul className="list-disc ml-5 space-y-1">
            {editedProject.projectAchievements.map((achievement, index) => (
              <li
                key={index}
                className="text-sm sm:text-base text-gray-600 dark:text-gray-300"
              >
                {achievement}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;







// import moment from "moment";

// const ProjectCard = ({ project }) => {
//   const {
//     projectTitle,
//     projectLiveLink,
//     projectGitLink,
//     projectAchievements,
//     startDate,
//     endDate,
//   } = project || {};

//   return (
//     <div className="bg-white dark:bg-gray-900 border-l-2 border-l-gray-300 dark:border-l-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 py-2 px-4 mb-4 w-full mx-auto">
//       <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
//         <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 flex-wrap">
//           <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100">
//             {projectTitle?.toUpperCase()}
//           </h2>
//           <div className="flex gap-2">
//             {projectLiveLink && (
//               <a
//                 href={projectLiveLink}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-sm sm:text-base font-medium text-blue-500 dark:text-blue-400 hover:underline transition-colors duration-200"
//               >
//                 Live Demo
//               </a>
//             )}
//             {projectGitLink && (
//               <a
//                 href={projectGitLink}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-sm sm:text-base font-medium text-gray-600 dark:text-gray-300 hover:underline transition-colors duration-200"
//               >
//                 GitHub
//               </a>
//             )}
//           </div>
//         </div>
//         <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 whitespace-nowrap">
//           <span className="font-medium">Duration: </span>
//           {moment(startDate).format("DD MMM, YYYY")} -{" "}
//           {endDate ? moment(endDate).format("DD MMM, YYYY") : "Present"}
//         </p>
//       </div>

//       {projectAchievements?.length > 0 && (
//         <div className="mt-2">
//           <p className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-200 mb-1">
//             Achievements:
//           </p>
//           <ul className="list-disc ml-5 space-y-1">
//             {projectAchievements.map((achievement, index) => (
//               <li
//                 key={index}
//                 className="text-sm sm:text-base text-gray-600 dark:text-gray-300"
//               >
//                 {achievement}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProjectCard;







