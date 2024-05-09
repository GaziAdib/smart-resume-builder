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
      className="bg-white border-l-2 border-l-gray-200 rounded-md py-2 px-3 mt-2"
      onDoubleClick={handleDoubleClick}
    >
      <h2 className="text-xl font-semibold">
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
          editedEducation.subject?.toUpperCase()
        )}
      </h2>
      <p className="text-gray-600 mb-1">
        <span className="font-semibold">Institution/College:</span>{" "}
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
          editedEducation.institution
        )}
      </p>
      <p className="text-gray-600 mb-1">
        <span className="font-semibold">Degree:</span>{" "}
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
          editedEducation?.degree
        )}
      </p>
      <p className="text-gray-600 mb-1">
        <span className="font-semibold">GPA:</span>{" "}
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
          editedEducation.GPA
        )}
      </p>
      <div className="flex flex-col sm:flex-row justify-between">
        <p className="text-gray-600 mb-1">
          <span className="font-semibold">Start Date:</span>{" "}
          {isEditing ? (
            <input
              type="date"
              name="startDate"
              value={moment(editedEducation.startDate).format("YYYY-MM-DD")}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          ) : (
            moment(editedEducation?.startDate).format("MMM YYYY")
          )}
        </p>
        <p className="text-gray-600 mb-1">
          <span className="font-semibold">End Date:</span>{" "}
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
              ? moment(editedEducation.endDate).format("MMM YYYY")
              : "Present"
          )}
        </p>
      </div>
      {isEditing && <span className="text-sm font-semibold text-green-700 text-start">Editing 🖊️ ...</span>}
    </div>
  );
};

export default EducationCard;