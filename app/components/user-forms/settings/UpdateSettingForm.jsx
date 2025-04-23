"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const UpdateSettingForm = ({setting}) => {

const [showEducationSection, setShowEducationSection] = useState(setting?.showEducation);
const [showWorkExperienceSection, setShowWorkExperienceSection] = useState(setting.showWorkExperience);
const [showPersonalDetailSection, setShowPersonalDetailSection] = useState(setting.showPersonalDetail);


const router = useRouter();


const handleToggleEducationSection = () => {
    setShowEducationSection(prevState => !prevState);
  };

  const handleToggleWorkExperienceSection = () => {
    setShowWorkExperienceSection(prevState => !prevState);
  };

  const handleTogglePersonalDetailSection = () => {
    setShowPersonalDetailSection(prevState => !prevState);
  }


  // Update settings if exists
  const handleUpdateSettings = async () => {

    try {

        const data = {
            showEducationSection,
            showWorkExperienceSection,
            showPersonalDetailSection
        }

        const res = await fetch(`/api/user/settings/update/${setting.id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        if (!res.ok) {
            console.log('There is some problem in getting response');
        }

        if (res.ok) {
            router.refresh()
            toast.success('Settings Updated succesfully', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            // router.push('/user/dashboard')
        }
    
  } catch (error) {
      console.log('error', error)
  }
  };

  return (
    <div className="max-w-md dark:bg-gray-900 mx-auto my-20 p-8">
      <h1 className="text-xl font-semibold mb-4 mt-4">Update Settings</h1>
      <hr className=""/>
      <div className="flex items-center justify-between mt-8 mb-4">
        <p className="text-base">Show Education Section</p>
        <div className="relative inline-block w-10 align-middle select-none">
          <input
            type="checkbox"
            name="toggleEducationSection"
            id="toggleEducationSection"
            className={`toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-300 ${showEducationSection ? 'bg-green-500 border-green-700 transform translate-x-full' : 'bg-gray-300 border-gray-400'}`}
            checked={showEducationSection ? showEducationSection : false}
            defaultChecked={setting.showEducation}
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
            defaultChecked={setting.showPersonalDetail}
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
            defaultChecked={setting.showWorkExperience}
            onChange={handleToggleWorkExperienceSection}
          />
          <label htmlFor="toggleWorkExperienceSection" className={`toggle-label block overflow-hidden h-6 rounded-full ${showWorkExperienceSection ? 'bg-green-300' : 'bg-gray-300'} cursor-pointer`}></label>
        </div>
      </div>
      <button onClick={handleUpdateSettings} className="w-full bg-blue-500 dark:text-gray-200 dark:bg-gray-700 border-2 text-white py-2 my-8 rounded-md shadow-md hover:bg-blue-600 dark:hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
        Update Setting
      </button>
    </div>
  );
}

export default UpdateSettingForm