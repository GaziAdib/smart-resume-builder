"use client";

import Button from '@/app/ui/Button';
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

const schema = z.object({
  name: z.string().trim().min(1, {message: 'skill name must be required!'}),
  proficiency: z.string(),
  experience: z.string(),
});


const AddSkillForm = () => {

  const { register, handleSubmit, reset, formState: {errors}} = useForm({
    resolver: zodResolver(schema)
  });
  
  const onSubmit = async (data) => {
    try {
          const res = await fetch('/api/user/resume/add-skill', {
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
              toast.success('New Skills added!', {
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
              
          }
      
    } catch (error) {
        console.log('error', error)
    }


  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
    <h2 className="text-xl font-semibold mb-6">Add Skills</h2>

    <div className="mb-4">
      <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Skill Name *</label>
      <input type="text" id="name" name="name" {...register('name', {required: true})} placeholder="ie. Nextjs, Nodejs, PHP" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
      {errors?.name && <p className="text-red-500">{errors?.name.message}</p>}
    </div>

    <div className="mb-4">
      <label htmlFor="proficiency" className="block text-gray-700 font-semibold mb-2">Proficiency*</label>
      <select id="proficiency" name="proficiency" {...register('proficiency')} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500">
        <option value="Expert">Expert</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Beginner">Beginner</option>
      </select>
      {errors?.proficiency && <p className="text-red-500">{errors?.proficiency.message}</p>}
    </div>

    <div className="mb-4">
      <label htmlFor="experience" className="block text-gray-700 font-semibold mb-2">Experience in Years *</label>
      <input type="text" id="experience" name="experience" {...register('experience')} placeholder="examaple 5 years etc.." className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
      {errors?.experience && <p className="text-red-500">{errors?.experience.message}</p>}
    </div>


  
    {/* Add more input fields for other fields in the schema */}
    <div className="mb-4">
      <Button label="Add Skills" color="white" bgColor="black" />
    </div>
  </form>
  )
}

export default AddSkillForm
