"use client";

import AddExperienceForm from "../user-forms/AddExperienceForm";

const AddWorkExperienceModal = ({isOpen, onClose}) => {

if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
    <div className="relative top-20 mx-auto p-3 border w-96 md:w-2/3 lg:w-1/2 shadow-lg rounded-md bg-white dark:bg-gray-800 dark:text-gray-200">
      <h2 className="text-lg font-bold mb-4 ml-5">Add New Work Experience</h2>
      <AddExperienceForm />
      <div className="flex justify-end mt-4">
        <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded mr-2 dark:bg-gray-700">Cancel</button>
      </div>
    </div>
  </div>
  )
}

export default AddWorkExperienceModal;
