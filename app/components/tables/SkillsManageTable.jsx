"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState } from "react";
import AddSkillModal from "../modals/AddSkillModal";

const SkillsManageTable = ({ skills }) => {

    const router = useRouter();

    const removeSkill = async (skillId) => {


    try {
        const response = await fetch(`/api/user/resume/delete-resume/remove-skill/${skillId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            router.refresh();
            toast.success('Skill Deleted Successfully!', {
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
        throw new Error('Failed to delete the Skill');
        }

    } catch (error) {
        console.error("Error removing Education Section:", error);
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
      <th className="p-3 font-bold uppercase bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200 border border-gray-300 hidden lg:table-cell">Skill Names</th>
      <th className="p-3 font-bold uppercase bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200 border border-gray-300 hidden lg:table-cell">Proficiency</th>
      <th className="p-3 font-bold uppercase bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200 border border-gray-300 hidden lg:table-cell">Experience</th>
      <th className="p-3 font-bold uppercase bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200 border border-gray-300 hidden lg:table-cell">Actions</th>
    </tr>
  </thead>
  <tbody>
    {skills?.map((skill, index) => (

      <tr
        key={index}
        className="bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
      >

        <td className="w-full lg:w-auto p-3 text-gray-800 dark:text-gray-200 text-center border border-b block lg:table-cell relative lg:static">
          <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Skill Name</span>
          {skill?.name}
        </td>

        {skill.proficiency  ? 
        
        <td className="w-full lg:w-auto p-3 text-gray-800 dark:text-gray-200 text-center border border-b block lg:table-cell relative lg:static">
            <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">{skill?.proficiency ? 'Skill Proficiency': ''}</span>

            {skill?.proficiency}

            </td> :

        <p className="text-center border border-b block w-full lg:w-auto p-3">Not Mentioned</p>
        }




        {skill.experience  ? 
        
        <td className="w-full lg:w-auto p-3 text-gray-800 dark:text-gray-200 text-center border border-b block lg:table-cell relative lg:static">
            <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">{skill?.experience ? 'Skill Experience': ''}</span>

            {skill?.experience}

            </td> :

        <p className="text-center border border-b block w-full lg:w-auto p-3">Not Mentioned</p>
        }

      
      
      
        <td className="w-full lg:w-auto p-3 text-gray-800 dark:text-gray-200 border border-b text-center block lg:table-cell relative lg:static">
          <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Actions</span>
          <button onClick={openModal} className="bg-green-600 text-gray-50 rounded-md px-3 hover:bg-green-800 cursor-pointer">
            Add
          </button>
          <button onClick={() => removeSkill(skill.id)} className="bg-red-200 px-2 mx-2 cursor-pointer rounded-md text-gray-600 hover:text-blue-600">
            Remove
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

    <AddSkillModal isOpen={isModalOpen} onClose={closeModal} />
  </div>

  )
}

export default SkillsManageTable




