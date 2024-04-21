"use client";

import Button from "@/app/ui/Button";
import { Controller, useForm } from "react-hook-form";
import TagsInput from "react-tagsinput";
import 'react-tagsinput/react-tagsinput.css';
import { toast } from "react-toastify";

const AddExperienceForm = () => {

  const { register, handleSubmit, reset, formState: {errors}, control} = useForm();
  
  const onSubmit = async (data) => {
    console.log(data);
    try {
          const res = await fetch('/api/user/resume/add-experience', {
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
              //router.push('/user/add-resume')
          }
      
    } catch (error) {
        console.log('error', error)
    }

  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-6">Add Work Experience</h2>
      <div className="mb-4">
        <label htmlFor="jobTitle" className="block text-gray-700 font-semibold mb-2">Job Title*</label>
        <input type="text" id="jobTitle" name="jobTitle" {...register('jobTitle', {required: true})} placeholder="ie. Project Manager..." className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
      </div>
      <div className="mb-4">
        <label htmlFor="companyName" className="block text-gray-700 font-semibold mb-2">Company Name*</label>
        <input type="text" id="companyName" name="companyName" {...register('companyName', {required: true})} placeholder="Google, Amazon, Apple..." className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
      </div>

      <div className="mb-4">
  <label htmlFor="jobResposibilities" className="block text-sm mt-2 p-1 font-medium text-gray-600">
    Job Responsibilities (UI Design, Testing, Coding) *
  </label>

  <Controller
    name="jobResposibilities"
    control={control}
    defaultValue={[]}
    render={({ field }) => (
      <div className="my-3 py-2">
        <ul className="list-disc list-inside">
          {field?.value?.map((responsibility, index) => (
            <li key={index} className="bg-gray-200 text-gray-600 mb-1 px-2 py-1 rounded-md">
              {responsibility}
            </li>
          ))}
        </ul>
        <TagsInput
          type="text"
          {...field}
          placeholder="Add job Responsibilities"
          className="py-2 my-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
    )}
  />
</div>


        <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-600">
                  Description (optional)
              </label>
            <textarea
                  type="text"
                  id="description"
                  rows={4}
                  name="description"
                  {...register('description')}
                  className="mt-2 p-2 w-full border text-gray-600 rounded-md"
                  placeholder="Enter description"
            />
        </div>  
      
    <div className="flex flex-col lg:flex-row md:flex-row justify-between items-center py-2">
        <div className="mb-4">
            <label htmlFor="startDate" className="block text-gray-700 font-semibold mb-2">Start Date*</label>
            <input type="date" id="startDate" name="startDate" {...register('startDate', {required: true})} placeholder="august 5, 2023" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
        </div>

        <div className="mb-4">
            <label htmlFor="endDate" className="block text-gray-500 font-semibold mb-2">End Date (optional)</label>
            <input type="date" id="endDate" name="endDate" {...register('endDate')} placeholder="august 5, 2023" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
        </div>
    </div>    
    
      {/* Add more input fields for other fields in the schema */}
      <div className="mb-4">
        <Button color={'orange'} label={'Add Work Experience'} />
      </div>
    </form>
  )
}

export default AddExperienceForm