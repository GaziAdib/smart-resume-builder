"use client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState } from "react";
import AddDevSkillModal from "../modals/AddDevSkillModal";

const DevSkillManageTable = ({ devSkill }) => {

    const router = useRouter();

    const removeDevSkill = async (devSkillId) => {

    try {
        const response = await fetch(`/api/user/resume/delete-resume/remove-devskill/${devSkillId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            router.refresh();
            toast.success('Dev Skill Deleted Successfully!', {
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
        throw new Error('Failed to delete the dev skill!');
        }

    } catch (error) {
        console.error("Error removing Dev Skill Section:", error);
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
      <th className="p-3 font-bold uppercase bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200 border border-gray-300 hidden lg:table-cell">Languages</th>
      <th className="p-3 font-bold uppercase bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200 border border-gray-300 hidden lg:table-cell">Frameworks</th>
      <th className="p-3 font-bold uppercase bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200 border border-gray-300 hidden lg:table-cell">Tools</th>
      <th className="p-3 font-bold uppercase bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200 border border-gray-300 hidden lg:table-cell">Actions</th>
    </tr>
  </thead>
  <tbody>
      <tr
        className="bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
      >

<td className="w-full lg:w-auto p-3 text-gray-800 dark:text-gray-200 text-center border border-b block lg:table-cell relative lg:static">
  <span className="lg:hidden absolute top-0 left-0 bg-blue-500 text-white px-2 py-1 text-xs font-bold uppercase rounded">Languages</span>
  <div className="space-y-1">
    {devSkill?.programmingLanguages?.map((language, index) => (
      <div key={index} className="flex items-center justify-center space-x-2 py-1 px-2 bg-blue-100 dark:bg-gray-700 rounded-lg shadow-sm">
        <span className="font-semibold">{index + 1}.</span>
        <span>{language}</span>
      </div>
    ))}
  </div>
</td>

<td className="w-full lg:w-auto p-3 text-gray-800 dark:text-gray-200 text-center border border-b block lg:table-cell relative lg:static">
  <span className="lg:hidden absolute top-0 left-0 bg-green-500 text-white px-2 py-1 text-xs font-bold uppercase rounded">Frameworks</span>
  <div className="space-y-1">
    {devSkill?.frameworks?.map((framework, index) => (
      <div key={index} className="flex items-center justify-center space-x-2 py-1 px-2 bg-green-100 dark:bg-gray-700 rounded-lg shadow-sm">
        <span className="font-semibold">{index + 1}.</span>
        <span>{framework}</span>
      </div>
    ))}
  </div>
</td>

<td className="w-full lg:w-auto p-3 text-gray-800 dark:text-gray-200 text-center border border-b block lg:table-cell relative lg:static">
  <span className="lg:hidden absolute top-0 left-0 bg-purple-500  text-white px-2 py-2 text-xs font-bold uppercase rounded">Tools</span>
  <div className="space-y-1">
    {devSkill?.tools?.map((tool, index) => (
      <div key={index} className="flex items-center justify-center space-x-2 py-1 px-2 bg-purple-100 dark:bg-gray-700 rounded-lg shadow-sm">
        <span className="font-semibold">{index + 1}.</span>
        <span>{tool}</span>
      </div>
    ))}
  </div>
</td>
    
       
        <td className="w-full lg:w-auto p-3 text-gray-800 dark:text-gray-200 border border-b text-center block lg:table-cell relative lg:static">
          <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Actions</span>
          <button onClick={openModal} className="bg-green-600 text-gray-50 rounded-md px-4 mx-2 py-3 text-lg  hover:bg-green-800 cursor-pointer">
            Add
          </button>
          <button onClick={() => removeDevSkill(devSkill.id)} className="bg-red-200 px-4 py-3 mx-2 text-lg cursor-pointer rounded-md text-gray-600 hover:text-blue-600">
            Remove
          </button>
        </td>
      </tr>
  </tbody>
</table>

    <AddDevSkillModal isOpen={isModalOpen} onClose={closeModal} />
  </div>

  )
}

export default DevSkillManageTable




