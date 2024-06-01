"use client";

import moment from "moment";
import { useState } from "react";
import { toast } from "react-toastify";

const EducationCard = ({ education }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEducation, setEditedEducation] = useState({ ...education });

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEducation((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/user/resume/update-resume/education/${education.id}`, {
          method: 'PUT',
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(editedEducation)
      })

      if (!res.ok) {
          console.log('There is some problem in getting response');
      }

      if (res.ok) {
          toast.success('Education updated!', {
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
        console.log('error Updating Education', error)
    }
    setIsEditing(false);
  };

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      await handleSave(); // Trigger save action when Enter key is pressed
    }
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 border-l-2 mt-3 border-l-gray-200 dark:border-l-gray-600  rounded-md py-4 px-3 my-2"
      onDoubleClick={handleDoubleClick}
    >
      <h3 className="text-xl font-semibold">
        {isEditing ? (
          <input
            type="text"
            name="subject"
            className={`mx-auto text-start rounded-sm px-2 ${
              isEditing ? "border border-gray-300 focus:outline-none focus:border-blue-500" : ""
            }`}
            value={editedEducation.subject}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{editedEducation.subject?.toUpperCase()}</h3>
        )}
      </h3>
      <p className="text-gray-600">
        <span className="font-semibold dark:text-gray-300">Institution/College:</span>{" "}
        {isEditing ? (
          <input
            type="text"
            name="institution"
            className="mx-auto text-start rounded-sm px-2 my-2"
            value={editedEducation.institution}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <span className="text-lg text-gray-800 dark:text-gray-300">{editedEducation.institution}</span>
        )}
      </p>
      <p className="text-gray-600">
        <span className="font-semibold dark:text-gray-300">Degree:</span>{" "}
        {isEditing ? (
          <input
            type="text"
            name="degree"
            className="mx-auto text-start rounded-sm px-2"
            value={editedEducation.degree}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        ) : (
        
          <span className="text-xl text-gray-800 dark:text-gray-300">{editedEducation?.degree}</span>
        )}
      </p>
      <p className="text-gray-600">
        <span className="font-semibold dark:text-gray-300">GPA:</span>{" "}
        {isEditing ? (
          <input
            type="text"
            name="GPA"
            className="mx-auto text-start rounded-sm px-2"
            value={editedEducation.GPA}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        ) : (
          
          <span className="text-xl text-gray-800 dark:text-gray-300">{editedEducation.GPA}</span>
          
        )}
      </p>
      <div className="flex flex-col sm:flex-row justify-between">
        <p className="text-gray-600">
          <span className="font-semibold dark:text-gray-300">Start Date:</span>{" "}
          {isEditing ? (
            <input
              type="date"
              name="startDate"
              value={moment(editedEducation.startDate).format("YYYY-MM-DD")}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          ) : (
            <p className="text-xl text-gray-800 dark:text-gray-300">{moment(editedEducation?.startDate).format("MMM YYYY")}</p>
          )}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold dark:text-gray-300">End Date:</span>{" "}
          {isEditing ? (
            <input
              type="date"
              name="endDate"
              value={
                editedEducation?.endDate
                  ? moment(editedEducation?.endDate).format("YYYY-MM-DD")
                  : ""
              }
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          ) : (
            editedEducation.endDate
              ? <span className="text-xl text-gray-800 dark:text-gray-300">{moment(editedEducation?.endDate).format("MMM YYYY")}</span>
              : "Present"
          )}
        </p>
      </div>
      {isEditing && <span className="text-sm font-semibold text-green-700 text-start">Editing 🖊️ ...</span>}
    </div>
  );
};

export default EducationCard;