"use client";

import { useState } from "react";
import { toast } from "react-toastify";


const AddSettingForm = () => {

const [showEducationSection, setShowEducationSection] = useState(false);
const [showWorkExperienceSection, setShowWorkExperienceSection] = useState(false);
const [showPersonalDetailSection, setShowPersonalDetailSection] = useState(false);


const handleToggleEducationSection = () => {
    setShowEducationSection(prevState => !prevState);
  };

  const handleToggleWorkExperienceSection = () => {
    setShowWorkExperienceSection(prevState => !prevState);
  };

  const handleTogglePersonalDetailSection = () => {
    setShowPersonalDetailSection(prevState => !prevState);
  }

  const handleAddSettings = async () => {
    // Handle saving settings here

    try {

        const data = {
            showEducationSection,
            showWorkExperienceSection,
            showPersonalDetailSection
        }

        const res = await fetch('/api/user/settings', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        if (!res.ok) {
            console.log('There is some problem in getting response');
        }

        if (res.ok) {
            toast.success('New Settings Added succesfully', {
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
      console.log('error', error)
  }
  };
  return (
    <div className="max-w-md mx-auto mt-8 p-4">
      <h1 className="text-xl font-semibold mb-4">Add Settings</h1>
     
      <div className="flex items-center justify-between mb-4">
        <p className="text-base">Show Education Section</p>
        <div className="relative inline-block w-10 align-middle select-none">
          <input
            type="checkbox"
            name="toggleEducationSection"
            id="toggleEducationSection"
            className={`toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-300 ${showEducationSection ? 'bg-green-500 border-green-700 transform translate-x-full' : 'bg-gray-300 border-gray-400'}`}
            checked={showEducationSection ? showEducationSection : false}
            onChange={handleToggleEducationSection}
          />
          <label htmlFor="toggleEducationSection" className={`toggle-label block overflow-hidden h-6 rounded-full ${showEducationSection ? 'bg-green-300' : 'bg-gray-300'} cursor-pointer`}></label>
        </div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-base">Show Personal Detail Section</p>
        <div className="relative inline-block w-10 align-middle select-none">
          <input
            type="checkbox"
            name="togglePersonalDetailSection"
            id="togglePersonalDetailSection"
            className={`toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-300 ${showPersonalDetailSection ? 'bg-green-500 border-green-700 transform translate-x-full' : 'bg-gray-300 border-gray-400'}`}
            checked={showPersonalDetailSection ? showPersonalDetailSection : false}
            onChange={handleTogglePersonalDetailSection}
          />
          <label htmlFor="togglePersonalDetailSection" className={`toggle-label block overflow-hidden h-6 rounded-full ${showPersonalDetailSection ? 'bg-green-300' : 'bg-gray-300'} cursor-pointer`}></label>
        </div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-base">Show Work Experience Section</p>
        <div className="relative inline-block w-10 align-middle select-none">
          <input
            type="checkbox"
            name="toggleWorkExperienceSection"
            id="toggleWorkExperienceSection"
            className={`toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-300 ${showWorkExperienceSection ? 'bg-green-500 border-green-700 transform translate-x-full' : 'bg-gray-300 border-gray-400'}`}
            checked={showWorkExperienceSection ? showWorkExperienceSection : false}
            onChange={handleToggleWorkExperienceSection}
          />
          <label htmlFor="toggleWorkExperienceSection" className={`toggle-label block overflow-hidden h-6 rounded-full ${showWorkExperienceSection ? 'bg-green-300' : 'bg-gray-300'} cursor-pointer`}></label>
        </div>
      </div>
      <button onClick={handleAddSettings} className="w-full bg-blue-500 text-white py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
        Add Setting
      </button>
    </div>
  )
}

export default AddSettingForm