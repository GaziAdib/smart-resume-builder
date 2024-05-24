"use client";

import Button from "@/app/ui/Button";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod';

const schema = z.object({
  subject: z.string().trim().min(3, {message: 'Please enter for Subject name with atleast 3 characters'}),
  institution: z.string().trim().min(3, {message: 'Please enter at least 3 words for Institute Name'}),
  degree: z.string().trim().min(2, {message: 'Please enter your degree'}),
  GPA: z.string().trim().min(2, {message: 'Please enter your GPA'}),
  startDate: z.string().trim().min(3, {message: 'Please enter Date'}),
  endDate: z.string().trim().min(3, {message: 'Please enter Date'}),
});



const AddEducationForm = ({resumeId}) => {


  const { register, handleSubmit, reset, formState: {errors}} = useForm({
    resolver: zodResolver(schema)
  });
  
  const onSubmit = async (data) => {
    console.log(data);
    try {
          const res = await fetch('/api/user/resume/add-education', {
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
              toast.success('New Educational Qualifications Added', {
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
      <h2 className="text-xl font-semibold mb-6">Add Educational Qualification</h2>
      <div className="mb-4">
        <label htmlFor="subject" className="block text-gray-700 font-semibold mb-2">Subject*</label>
        <input type="text" id="subject" name="subject" {...register('subject', {required: true})} placeholder="ie. Masters in CSE..." className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
        {errors?.subject && <p className="text-red-500">{errors?.subject.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="institution" className="block text-gray-700 font-semibold mb-2">Institution*</label>
        <input type="text" id="institution" name="institution" {...register('institution', {required: true})} placeholder="School, Colledge, University..." className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
        {errors?.institution && <p className="text-red-500">{errors?.institution.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="degree" className="block text-gray-500 font-semibold mb-2">Degree (optional)</label>
        <input type="text" id="degree" name="degree" {...register('degree')} placeholder="MSC, BSC, IT, HSC, SSC" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
        {errors?.degree && <p className="text-red-500">{errors?.degree.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="GPA" className="block text-gray-700 font-semibold mb-2">GPA*</label>
        <input type="text" id="GPA" name="GPA" {...register('GPA', {required: true})} placeholder="3.0 / 4.0" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
        {errors?.GPA && <p className="text-red-500">{errors?.GPA.message}</p>}
      </div>

    <div className="flex flex-col lg:flex-row md:flex-row justify-between items-center py-2">
        <div className="mb-4">
            <label htmlFor="startDate" className="block text-gray-700 font-semibold mb-2">Start Date*</label>
            <input type="date" id="startDate" name="startDate" {...register('startDate', {required: true})} placeholder="august 5, 2023" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
            {errors?.startDate && <p className="text-red-500">{errors?.startDate.message}</p>}
        </div>

        <div className="mb-4">
            <label htmlFor="endDate" className="block text-gray-500 font-semibold mb-2">End Date (optional)</label>
            <input type="date" id="endDate" name="endDate" {...register('endDate')} placeholder="august 5, 2023" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
            {errors?.startDate && <p className="text-red-500">{errors?.startDate.message}</p>}
        </div>
    </div>    
    
      {/* Add more input fields for other fields in the schema */}
      <div className="mb-4">
      <Button label="Add Education" color="white" bgColor="black" />
      </div>
    </form>
  )
}

export default AddEducationForm