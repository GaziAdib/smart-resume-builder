"use client";

import Button from "@/app/ui/Button";
import { Controller, useForm } from "react-hook-form";
import TagsInput from "react-tagsinput";
import { toast } from "react-toastify";

const AddResumeForm = () => {

  const { register, handleSubmit, reset, formState: {errors}, control} = useForm();
  
  const onSubmit = async (data) => {
    console.log(data);
    // try {
    //       const res = await fetch('/api/user/resume/add-resume', {
    //           method: 'POST',
    //           headers: {
    //               "Content-Type": "application/json"
    //           },
    //           body: JSON.stringify(data)
    //       })

    //       if (!res.ok) {
    //           console.log('There is some problem in getting response');
    //       }

    //       if (res.ok) {
    //           toast.success('New Resume Added succesfully', {
    //               position: "top-right",
    //               autoClose: 3000,
    //               hideProgressBar: false,
    //               closeOnClick: true,
    //               pauseOnHover: true,
    //               draggable: true,
    //               progress: undefined,
    //               theme: "light",
    //           });
    //           reset();
    //           //router.push('/user/add-resume')
    //       }
      
    // } catch (error) {
    //     console.log('error', error)
    // }


  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-6">Add Resume & Personal Info</h2>
      <div className="mb-4">
        <label htmlFor="careerObjective" className="block text-gray-700 font-semibold mb-2">Career Objective*</label>
        <textarea type="text" id="careerObjective" name="careerObjective" {...register('careerObjective', {required: true})} placeholder="Your Objective..." className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
      </div>

      <div className="mb-4">
        <label htmlFor="interests" className="block text-sm mt-2 p-1 font-medium text-gray-600">
          Hobby | Interests (Photography, Traveling) *
        </label>

          <Controller
            name="interests"
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
                  placeholder="Add interests"
                  className="py-2 my-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
            )}
          />
      </div> 


      <div className="mb-4">
        <label htmlFor="languageProficiencies" className="block text-sm mt-2 p-1 font-medium text-gray-600">
          Language Proficiencies (English, bangla etc.) *
        </label>

          <Controller
            name="languageProficiencies"
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
                  placeholder="Add language Proficiencies"
                  className="py-2 my-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
            )}
          />
      </div> 


    {/* peronal details */}

    <div className="mb-4">
        <label htmlFor="personalDetail" className="block text-gray-700 font-semibold mb-2">Personal Detail*</label>
        <input type="text" id="personalDetail" name="personalDetail" {...register('personalDetail.fatherName', {required: true})} placeholder="Your Personal Detail..." className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
    </div>

    <div className="mb-4">
        <label htmlFor="personalDetail" className="block text-gray-700 font-semibold mb-2">Personal Detail*</label>
        <input type="text" id="personalDetail" name="personalDetail" {...register('personalDetail.motherName', {required: true})} placeholder="Your Personal Detail..." className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
    </div>


    <div className="mb-4">
      <label htmlFor="mySignature" className="block text-gray-700 font-semibold mb-2">Your Signature*</label>
      <input type="text" id="mySignature" name="mySignature" {...register('mySignature', {required: true})} placeholder="Your Unique Signature..." className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
    </div>


    <div className="mb-4">
      <label htmlFor="declaration" className="block text-gray-700 font-semibold mb-2">Declarations*</label>
      <input type="text" id="declaration" name="GPA" {...register('declaration', {required: true})} placeholder="add declarations..." className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
    </div>

  
    
      {/* Add more input fields for other fields in the schema */}
      <div className="mb-4">
        <Button label="Add Resume" color="white" bgColor="black" />
      </div>
    </form>
  )
}

export default AddResumeForm

