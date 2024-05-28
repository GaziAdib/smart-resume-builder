"use client";
import moment from "moment";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState } from "react";

import AddWorkExperienceModal from "../modals/AddWorkExperienceModal";

const WorkExperienceManageTable = ({ experiences }) => {

    const router = useRouter();

    const removeWorkExperience = async (expId) => {


    try {
        
        const response = await fetch(`/api/user/resume/delete-resume/remove-experience/${expId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            router.refresh();
            toast.success('Experience Deleted Successfully!', {
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

        if (!response.ok) {
            throw new Error('Failed to delete the experience');
        }

    } catch (error) {
        console.error("Error removing experience:", error);
    }
    };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  return (
    <div>
    <table className="border-collapse w-full dark:bg-gray-800">
  <thead>
    <tr>
      <th className="p-3 font-bold uppercase bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200 border border-gray-300 hidden lg:table-cell">Job Title</th>
      <th className="p-3 font-bold uppercase bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200 border border-gray-300 hidden lg:table-cell">Company Name</th>
      <th className="p-3 font-bold uppercase bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200 border border-gray-300 hidden lg:table-cell">Start Date</th>
      <th className="p-3 font-bold uppercase bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200 border border-gray-300 hidden lg:table-cell">End Date</th>
      <th className="p-3 font-bold uppercase bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200 border border-gray-300 hidden lg:table-cell">Actions</th>
    </tr>
  </thead>
  <tbody>
    {experiences?.map((experience, index) => (
      <tr
        key={index}
        className="bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
      >
        <td className="w-full lg:w-auto p-3 text-gray-800 dark:text-gray-200 text-center border border-b block lg:table-cell relative lg:static">
          <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Job Title</span>
          {experience?.jobTitle}
        </td>
        <td className="w-full lg:w-auto p-3 text-gray-800 dark:text-gray-200 border border-b text-center block lg:table-cell relative lg:static">
          <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Company Name</span>
          <p>
            {experience?.companyName}
          </p>
        </td>
      
        <td className="w-full lg:w-auto p-3 text-gray-800 dark:text-gray-200 border border-b text-center block lg:table-cell relative lg:static">
          <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Start Date</span>
          {moment(experience?.startDate).format("DD MMM, YYYY")}
        </td>

        <td className="w-full lg:w-auto p-3 text-gray-800 dark:text-gray-200 border border-b text-center block lg:table-cell relative lg:static">
          <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">End Date</span>
          {moment(experience?.endDate).format("DD MMM, YYYY")}
        </td>

        <td className="w-full lg:w-auto p-3 text-gray-800 dark:text-gray-200 border border-b text-center block lg:table-cell relative lg:static">
          <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Actions</span>
          <button onClick={openModal} className="bg-green-600 text-gray-50 rounded-md px-3 hover:bg-green-800 cursor-pointer">
            Add
          </button>
          <button onClick={() => removeWorkExperience(experience.id)} className="bg-red-200 px-2 mx-2 cursor-pointer rounded-md text-gray-600 hover:text-blue-600">
            Remove
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

    <AddWorkExperienceModal isOpen={isModalOpen} onClose={closeModal} />
  </div>

  )
}

export default WorkExperienceManageTable




