"use client";

import Button from "@/app/ui/Button";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod';
import TagsInput from "react-tagsinput";
import 'react-tagsinput/react-tagsinput.css';
import { useRouter } from "next/navigation";

const isValidURL = (value) => {
    return value.startsWith('https://');
  };

const schema = z.object({
  projectTitle: z.string().trim().min(5, {message: 'Please enter project Title'}),
  projectGitLink: z.string().refine(isValidURL, {
    message: 'Github Link must start with "https://"',
  }),
  projectLiveLink: z.string().refine(isValidURL, {
    message: 'Live Link must start with "https://"',
  }),
  projectAchievements: z.array(z.string()).nonempty('Please Enter atleast 1 Project Achievements'),
  startDate: z.string().trim().min(3, {message: 'Please enter Date'}),
  endDate: z.string().trim().min(3, {message: 'Please enter Date'}),
});


  


const AddProjectForm = () => {

  const router = useRouter();

  const { register, handleSubmit, reset, control, formState: {errors}} = useForm({
    resolver: zodResolver(schema)
  });
  
  const onSubmit = async (data) => {
    try {
          const res = await fetch('/api/user/resume/add-project', {
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
              toast.success('New Project Added', {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
              });
              reset();
              router.refresh();
          }
      
    } catch (error) {
        console.log('error', error)
    }


  };

  return (
   

<form onSubmit={handleSubmit(onSubmit)} className="mx-auto p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
<h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Add Project</h2>
<div className="mb-4">
  <label htmlFor="projectTitle" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Project Title*</label>
  <input type="text" id="projectTitle" name="projectTitle" {...register('projectTitle', { required: true })} placeholder="Project Title" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300" />
  {errors?.projectTitle && <p className="text-red-500">{errors?.projectTitle.message}</p>}
</div>
<div className="mb-4">
  <label htmlFor="projectGitLink" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Github Link</label>
  <input type="text" id="projectGitLink" name="projectGitLink" {...register('projectGitLink')} placeholder="Enter Github Link" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300" />
  {errors?.projectGitLink && <p className="text-red-500">{errors?.projectGitLink.message}</p>}
</div>
<div className="mb-4">
  <label htmlFor="projectLiveLink" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Live Link*</label>
  <input type="text" id="projectLiveLink" name="projectLiveLink" {...register('projectLiveLink', { required: true })} placeholder="Enter Live Link" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300" />
  {errors?.projectLiveLink && <p className="text-red-500">{errors?.projectLiveLink.message}</p>}
</div>
<div className="mb-4">
  <label htmlFor="projectAchievements" className="block text-sm mt-2 p-1 font-medium text-gray-600 dark:text-gray-400">Project Achievements *</label>
  <Controller
    name="projectAchievements"
    control={control}
    defaultValue={[]}
    render={({ field }) => (
      <div className="my-3 py-2">
        <ul className="list-disc list-inside">
          {field?.value?.map((projectAchievement, index) => (
            <li key={index} className="bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 mb-1 px-2 py-1 rounded-md">
              {projectAchievement}
            </li>
          ))}
        </ul>
        <TagsInput
          type="text"
          {...field}
          placeholder="Add Project Achievements"
          className="py-2 my-2 w-full border rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
        />
      </div>
    )}
  />
  {errors?.projectAchievements && <p className="text-red-500">{errors?.projectAchievements.message}</p>}
</div>
<div className="flex flex-col lg:flex-row md:flex-row justify-between items-center py-2">
  <div className="mb-4">
    <label htmlFor="startDate" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Start Date*</label>
    <input type="date" id="startDate" name="startDate" {...register('startDate', { required: true })} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300" />
    {errors?.startDate && <p className="text-red-500">{errors?.startDate.message}</p>}
  </div>
  <div className="mb-4">
    <label htmlFor="endDate" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">End Date (optional)</label>
    <input type="date" id="endDate" name="endDate" {...register('endDate')} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300" />
  </div>
</div>
      <div className="mb-4">
        <Button label="Add Project" color="white" bgColor="black" />
      </div>
</form>
  )
}

export default AddProjectForm



   