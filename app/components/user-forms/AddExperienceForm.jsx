"use client";

import Button from "@/app/ui/Button";
import { Controller, useForm } from "react-hook-form";
import TagsInput from "react-tagsinput";
import 'react-tagsinput/react-tagsinput.css';
import { toast } from "react-toastify";
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod';
import { useRouter } from "next/navigation";

const schema = z.object({
  jobTitle: z.string().trim().min(5, {message: 'Please enter for Job Title with atleast 5 characters'}),
  companyName: z.string().trim().min(3, {message: 'Please enter for Institute Name with atleast 3 characters'}),
  jobResposibilities: z.array(z.string()).nonempty('Please Enter atleast 1 Job Resposibilities'),
  startDate: z.string().trim().min(3, {message: 'Please enter Date'}),
  endDate: z.string().trim().min(3, {message: 'Please enter Date'}),
});


const AddExperienceForm = () => {

  const router = useRouter();

  const { register, handleSubmit, reset, formState: {errors}, control} = useForm({
    resolver: zodResolver(schema)
  });
  
  const onSubmit = async (data) => {
    try {
          const res = await fetch('/api/user/resume/add-experience',  {
              method: 'POST',
              headers: {
                  "Content-Type": "application/json"
              },
              cache: 'no-store',
              body: JSON.stringify(data)
          })

          if (!res.ok) {
              console.log('There is some problem in getting response');
          }

          if (res.ok) {
              toast.success('New work Experience Added!', {
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
    <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Add Work Experience</h2>
    <div className="mb-4">
      <label htmlFor="jobTitle" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Job Title*</label>
      <input type="text" id="jobTitle" name="jobTitle" {...register('jobTitle', { required: true })} placeholder="ie. Project Manager..." className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300" />
      {errors?.jobTitle && <p className="text-red-500">{errors?.jobTitle.message}</p>}
    </div>
    <div className="mb-4">
      <label htmlFor="companyName" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Company Name*</label>
      <input type="text" id="companyName" name="companyName" {...register('companyName', { required: true })} placeholder="Google, Amazon, Apple..." className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300" />
      {errors?.companyName && <p className="text-red-500">{errors?.companyName.message}</p>}
    </div>
    <div className="mb-4">
      <label htmlFor="jobResposibilities" className="block text-sm mt-2 p-1 font-medium text-gray-600 dark:text-gray-400">Job Responsibilities (UI Design, Testing, Coding) *</label>
      <Controller
        name="jobResposibilities"
        control={control}
        defaultValue={[]}
        render={({ field }) => (
          <div className="my-3 py-2">
            <ul className="list-disc list-inside">
              {field?.value?.map((responsibility, index) => (
                <li key={index} className="bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 mb-1 px-2 py-1 rounded-md">
                  {responsibility}
                </li>
              ))}
            </ul>
            <TagsInput
              type="text"
              {...field}
              placeholder="Add job Responsibilities"
              className="py-2 my-2 w-full border rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
            />
          </div>
        )}
      />
      {errors?.jobResposibilities && <p className="text-red-500">{errors?.jobResposibilities.message}</p>}
    </div>
    <div className="mb-4">
      <label htmlFor="description" className="block text-sm font-medium text-gray-600 dark:text-gray-400">Description (optional)</label>
      <textarea id="description" rows={4} name="description" {...register('description')} className="mt-2 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300" placeholder="Enter description" />
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
        <Button label="Add Experience" color="white" bgColor="black" />
      </div>
  </form>
    
  )
}

export default AddExperienceForm