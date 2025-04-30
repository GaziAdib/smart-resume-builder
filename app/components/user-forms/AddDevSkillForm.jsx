
"use client";

import Button from '@/app/ui/Button';
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form';
import TagsInput from 'react-tagsinput';
import { toast } from 'react-toastify';
import 'react-tagsinput/react-tagsinput.css';
import { z } from 'zod';


const schema = z.object({
  programmingLanguages: z.array(z.string()).nonempty('Please Enter atleast 1 Programming Language'),
  frameworks: z.array(z.string()).nonempty('Please Enter atleast 1 framework'),
  tools: z.array(z.string()).nonempty('Please Enter atleast 1 tool'),
  platforms: z.array(z.string()).nonempty('Please Enter atleast 1 Platform'),
  softSkills: z.array(z.string()).nonempty('Please Enter atleast 1 Soft Skill')
});


const AddDevSkillForm = () => {

  const { register, handleSubmit, reset, control, formState: {errors}} = useForm({
    resolver: zodResolver(schema)
  });
  
  const onSubmit = async (data) => {
    try {
          const res = await fetch('/api/user/resume/add-dev-skill', {
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
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg dark:bg-gray-800 mx-auto p-6 bg-white shadow-md rounded-lg">
    <h2 className="text-xl font-semibold mb-6 dark:text-white">Add Developer Skills 👨‍💻</h2>

   

    
    <div className="mb-4">
      <label htmlFor="programmingLanguages" className="block text-xl mt-2 p-1 font-medium text-gray-600 dark:text-white">
        Programming Languages *
      </label>

        <Controller
          name="programmingLanguages"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <div className="my-3 py-2">
              <ul className="list-disc list-inside">
                {field?.value?.map((language, index) => (
                  <li key={index} className="bg-gray-200 font-semibold text-gray-600 dark:bg-gray-800 dark:text-gray-200 mb-1 px-2 py-1 rounded-md">
                    {language}
                  </li>
                ))}
              </ul>
              <TagsInput
                type="text"
                {...field}
                placeholder="Add Programming Language"
                className="py-2 my-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
          )}
        />
        {errors?.programmingLanguages && <p className="text-red-500">{errors?.programmingLanguages.message}</p>}
    </div>

    <div className="mb-4">
      <label htmlFor="frameworks" className="block dark:text-white text-lg mt-2 p-1 font-medium text-gray-600">
        Frameworks *
      </label>

        <Controller
          name="frameworks"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <div className="my-3 py-2">
              <ul className="list-disc list-inside">
                {field?.value?.map((framework, index) => (
                  <li key={index} className="bg-gray-200 text-gray-600 mb-1 px-2 py-1 rounded-md">
                    {framework}
                  </li>
                ))}
              </ul>
              <TagsInput
                type="text"
                {...field}
                placeholder="Add framework"
                className="py-2 my-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
          )}
        />
        {errors?.frameworks && <p className="text-red-500">{errors?.frameworks.message}</p>}
    </div>




    <div className="mb-4">
      <label htmlFor="tools" className="block text-lg mt-2 p-1 dark:text-white font-medium text-gray-600">
        Add Tools *
      </label>

        <Controller
          name="tools"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <div className="my-3 py-2">
              <ul className="list-disc list-inside">
                {field?.value?.map((tool, index) => (
                  <li key={index} className="bg-gray-200 text-gray-600 mb-1 px-2 py-1 rounded-md">
                    {tool}
                  </li>
                ))}
              </ul>
              <TagsInput
                type="text"
                {...field}
                placeholder="Add Programming Tools"
                className="py-2 my-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
          )}
        />
        {errors?.tools && <p className="text-red-500">{errors?.tools.message}</p>}
    </div>



    <div className="mb-4">
      <label htmlFor="platforms" className="block text-lg mt-2 p-1 dark:text-white font-medium text-gray-600">
        Platforms *
      </label>

        <Controller
          name="platforms"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <div className="my-3 py-2">
              <ul className="list-disc list-inside">
                {field?.value?.map((platform, index) => (
                  <li key={index} className="bg-gray-200 text-gray-600 mb-1 px-2 py-1 rounded-md">
                    {platform}
                  </li>
                ))}
              </ul>
              <TagsInput
                type="text"
                {...field}
                placeholder="Add Platform"
                className="py-2 my-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
          )}
        />
        {errors?.platforms && <p className="text-red-500">{errors?.platforms.message}</p>}
    </div>


    <div className="mb-4">
      <label htmlFor="softSkills" className="block text-lg mt-2 dark:text-white p-1 font-medium text-gray-600">
        Soft Skills *
      </label>

        <Controller
          name="softSkills"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <div className="my-3 py-2">
              <ul className="list-disc list-inside">
                {field?.value?.map((softSkill, index) => (
                  <li key={index} className="bg-gray-200 text-gray-600 mb-1 px-2 py-1 rounded-md">
                    {softSkill}
                  </li>
                ))}
              </ul>
              <TagsInput
                type="text"
                {...field}
                placeholder="Add Platform"
                className="py-2 my-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
          )}
        />
        {errors?.softSkills && <p className="text-red-500">{errors?.softSkills.message}</p>}
    </div>

   
   

   
  
    {/* Add more input fields for other fields in the schema */}
    <div className="mb-4">
      <Button label="Add Dev Skills" color="white" bgColor="black" />
    </div>
  </form>
  )
}

export default AddDevSkillForm

