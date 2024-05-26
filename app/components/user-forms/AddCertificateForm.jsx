"use client";

import Button from "@/app/ui/Button";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod';
import TagsInput from "react-tagsinput";
import 'react-tagsinput/react-tagsinput.css';

const isValidURL = (value) => {
    return value.startsWith('https://');
  };

const schema = z.object({
  certificateTitle: z.string().trim().min(5, {message: 'Please enter certificate Title'}),
  certificateLink: z.string().refine(isValidURL, {
    message: 'Certificate Link must start with "https://"',
  }),
  certificateFrom: z.string().trim().min(3, {message: 'Please enter certificate From'}),
  certificateAchievements: z.array(z.string()).nonempty('Please Enter atleast 1 Certtificate Achievements'),
  startDate: z.string().trim().min(3, {message: 'Please enter Date'}),
  endDate: z.string().trim().min(3, {message: 'Please enter Date'}),
});


  


const AddCertificateForm = () => {

  const { register, handleSubmit, reset, control, formState: {errors}} = useForm({
    resolver: zodResolver(schema)
  });
  
  const onSubmit = async (data) => {
    try {
          const res = await fetch('/api/user/resume/add-certificate', {
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
              toast.success('New Certificate Added', {
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
              router.push('/user/add-resume')
          }
      
    } catch (error) {
        console.log('error', error)
    }


  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto p-6 shadow-md rounded-lg bg-white dark:bg-gray-800">
  <h2 className="text-xl font-semibold mb-6">Add Certificate 🎓</h2>
  
  <div className="mb-4">
    <label htmlFor="certificateTitle" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Certificate Title *</label>
    <input type="text" id="certificateTitle" name="certificateTitle" {...register('certificateTitle', {required: true})} placeholder="Certificate Title" className="w-full px-4 py-2 border rounded-md focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:border-blue-500" />
    {errors?.certificateTitle && <p className="text-red-500">{errors?.certificateTitle.message}</p>}
  </div>

  <div className="mb-4">
    <label htmlFor="certificateFrom" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Certificate From *</label>
    <input type="text" id="certificateFrom" name="certificateFrom" {...register('certificateFrom', {required: true})} placeholder="Certificate From" className="w-full px-4 py-2 border rounded-md focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:border-blue-500" />
    {errors?.certificateFrom && <p className="text-red-500">{errors?.certificateFrom.message}</p>}
  </div>

  <div className="mb-4">
    <label htmlFor="certificateLink" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Certificate Link *</label>
    <input type="text" id="certificateLink" name="certificateLink" {...register('certificateLink', {required: true})} placeholder="Enter Certificate Link" className="w-full px-4 py-2 border rounded-md focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:border-blue-500" />
    {errors?.certificateLink && <p className="text-red-500">{errors?.certificateLink.message}</p>}
  </div>

  <div className="mb-4">
    <label htmlFor="certificateAchievements" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Certificate Achievements *</label>
    <Controller
      name="certificateAchievements"
      control={control}
      defaultValue={[]}
      render={({ field }) => (
        <div className="my-3 py-2">
          <ul className="list-disc list-inside">
            {field?.value?.map((certificateAchievement, index) => (
              <li key={index} className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200 mb-1 px-2 py-1 rounded-md">
                {certificateAchievement}
              </li>
            ))}
          </ul>
          <TagsInput
            type="text"
            {...field}
            placeholder="Add Certificate Achievements"
            className="w-full py-2 my-2 border rounded-md focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:border-blue-500"
          />
        </div>
      )}
    />
    {errors?.certificateAchievements && <p className="text-red-500">{errors?.certificateAchievements.message}</p>}
  </div>

  <div className="flex flex-col lg:flex-row md:flex-row justify-between items-center py-2">
    <div className="mb-4">
      <label htmlFor="startDate" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Start Date *</label>
      <input type="date" id="startDate" name="startDate" {...register('startDate', {required: true})} placeholder="August 5, 2023" className="w-full px-4 py-2 border rounded-md focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:border-blue-500" />
      {errors?.startDate && <p className="text-red-500">{errors?.startDate.message}</p>}
    </div>

    <div className="mb-4">
      <label htmlFor="endDate" className="block text-gray-500 dark:text-gray-300 font-semibold mb-2">End Date (optional)</label>
      <input type="date" id="endDate" name="endDate" {...register('endDate')} placeholder="August 5, 2023" className="w-full px-4 py-2 border rounded-md focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:border-blue-500" />
    </div>
  </div>

  <div className="mb-4">
    <Button label="Add Certificate" color="white" bgColor="black" />
  </div>
</form>
  )
}

export default AddCertificateForm




    


  