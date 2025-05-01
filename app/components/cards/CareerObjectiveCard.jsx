"use client";

import { useState } from 'react';

const CareerObjectiveCard = ({ careerObjective, resumeId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentObjective, setCurrentObjective] = useState(careerObjective);
  const [newObjective, setNewObjective] = useState(careerObjective);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (event) => {
    setNewObjective(event.target.value);
  };

  const handleUpdateCareerObjective = async () => {
    try {
      const response = await fetch(`/api/user/resume/update-resume/career-objective/${resumeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ careerObjective: newObjective }),
      });

      if (!response.ok) {
        throw new Error('Failed to update career objective');
      }

      const updatedObjective = await response.json();
      setCurrentObjective(updatedObjective.careerObjective);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update career objective:', error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();  // Prevents new line creation on Enter
      handleUpdateCareerObjective();
    }
  };

  return (
    <div className="container rounded-md py-4 my-2 mx-auto justify-center items-center">
      <div className="bg-gray-50  text-gray-900 my-4 py-2 px-2 shadow-sm border-2 border-l-gray-900">
        <p className="text-xl text-gray-900 font-semibold">Career Objective</p>
      </div>
      <div onDoubleClick={handleDoubleClick}>
        {isEditing ? (
          <div>
            <textarea
              className="w-full text-lg dark:bg-gray-900 dark:text-white text-justify border border-gray-300 rounded-md p-2"
              value={newObjective}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              autoFocus
            />
          </div>
        ) : (
          <p className="text-lg text-justify text-gray-900 dark:text-white">{currentObjective}</p>
        )}
      </div>
    </div>
  );
};

export default CareerObjectiveCard;



