"use client";


import Button from "@/app/ui/Button";
import { Controller, useForm } from "react-hook-form";
import TagsInput from "react-tagsinput";
import { toast } from "react-toastify";
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod';



// Define your Zod schema

const isValidURL = (value) => {
  return value.startsWith('https://');
};

const schema = z.object({
  profileImage: z.string().refine(isValidURL, {
    message: 'Profile image must start with "https://"',
  }),
  careerObjective: z.string().trim().min(20, { message: "Carrer Objective Required at least 20 words" }),
  languageProficiencies: z.array(z.string().min(3, {message: 'Please enter at least one language proficiency'})),
  interests: z.array(z.string().nonempty('Please enter at least one interest')),
  mySignature: z.string().trim().min(3, {message: 'Please enter at least 3 words for signature'}),
  personalDetail: z.object({
    fatherName: z.string().nonempty('Father Name is required'),
    motherName: z.string().nonempty('Mother Name is required'),
    dob: z.string().nonempty('Date of Birth is required'),
    nationality: z.string().nonempty('Nationality is required'),
    religion: z.string().nonempty('Religion is required'),
    maritalStatus: z.string().nonempty('Marital status is required'),
    bloodGroup:z.string().nonempty('Blood group is required'),
    height: z.string().nonempty('Height is required'),
  }),
});


const AddResumeForm = () => {


  const { register, handleSubmit, reset, formState: {errors}, control} = useForm({
    resolver: zodResolver(schema)
  });
  
  const onSubmit = async (data) => {
    console.log(data);
    try {
          const res = await fetch('/api/user/resume/add-resume', {
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
              //let rawData = await res.json();

              // setResumeId(rawData.resumeId);
              toast.success('New Resume Added succesfully', {
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
    <form data-step="1" onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-6 bg-white dark:bg-gray-900 shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-6 dark:text-white">Add Resume & Personal Info</h2>

      <div className="mb-4">
        <label htmlFor="profileImage" className="block text-gray-700 font-semibold mb-2 dark:text-white">Profile Image Link</label>
        <input type="text" id="profileImage" name="profileImage" {...register('profileImage')} placeholder="Add Profile Image..." className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white focus:outline-none focus:border-blue-500" />
        {errors?.profileImage && <p className="text-red-500">{errors.profileImage.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="careerObjective" className="block text-gray-700 dark:text-white font-semibold mb-2 ">Career Objective*</label>
        <textarea type="text" id="careerObjective" name="careerObjective" {...register('careerObjective', {required: true})} placeholder="Your Objective..." className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white focus:outline-none focus:border-blue-500" />
        {errors?.careerObjective && <p className="text-red-500">{errors.careerObjective.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="interests" className="block text-sm mt-2 p-1 font-medium text-gray-600 dark:text-white">
          Hobby | Interests (Photography, Traveling) *
        </label>
        <Controller
          name="interests"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <div className="my-3 py-2">
              <TagsInput
                value={field.value}
                onChange={(newValue) => field.onChange(newValue)}
                placeholder="Add interests"
                className="py-2 my-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
          )}
        />
        {errors?.interests && <p className="text-red-500">{errors.interests.message}</p>}
      </div>


      <div className="mb-2">
        <label htmlFor="languageProficiencies" className="block text-sm mt-2 p-1 font-medium text-gray-600 dark:text-white">
          Language Proficiencies (English, bangla etc.) *
        </label>

          <Controller
            name="languageProficiencies"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <div className="my-3 py-2">
                <ul className="list-disc list-inside">
                  {field?.value?.map((proficiency, index) => (
                    <li key={index} className="bg-gray-200 text-gray-600 mb-1 px-2 py-1 rounded-md">
                      {proficiency}
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
          {errors?.languageProficiencies && <p className="text-red-500">{errors?.languageProficiencies?.message}</p>}
      </div> 


    {/* peronal details */}

    

    <h2 className="font-semibold text-lg mt-3 mb-3 py-2 dark:text-white">+ Add Personal Details</h2>

    <div className="mb-4">
        <label htmlFor="personalDetail" className="block text-gray-700 font-semibold mb-2 dark:text-white">Father's Name*</label>
        <input type="text" id="personalDetail" name="personalDetail" {...register('personalDetail.fatherName')} placeholder="Your Father's Name..." className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
        {errors?.personalDetail?.fatherName && <p className="text-red-500">{errors?.personalDetail?.fatherName.message}</p>}
    </div>        

    <div className="mb-4">
        <label htmlFor="personalDetail" className="block text-gray-700 font-semibold mb-2 dark:text-white">Mother's Name*</label>
        <input type="text" id="personalDetail" name="personalDetail" {...register('personalDetail.motherName')} placeholder="Your Mother's Name..." className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
        {errors?.personalDetail?.motherName && <p className="text-red-500">{errors.personalDetail?.motherName.message}</p>}
    </div>

    <div className="mb-4">
        <label htmlFor="personalDetail" className="block text-gray-700 font-semibold mb-2 dark:text-white">Date Of Birth*</label>
        <input type="date" id="personalDetail" name="personalDetail" {...register('personalDetail.dob')} placeholder="Your Date of Birth (3/3/2013)..." className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
        {errors?.personalDetail?.dob && <p className="text-red-500">{errors.personalDetail?.dob?.message}</p>}
    </div>

    <div className="mb-4">
    <label htmlFor="personalDetail" className="block text-gray-700 font-semibold mb-2 dark:text-white">Your Religion*</label>
      <select id="personalDetail" name="personalDetail" {...register('personalDetail.religion')} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500">
          <option value="">Select your religion...</option>
          <option value="Christianity">Christianity</option>
          <option value="Islam">Islam</option>
          <option value="Hinduism">Hinduism</option>
          <option value="Buddhism">Buddhism</option>
          <option value="Judaism">Judaism</option>
      </select>
      {errors?.personalDetail?.religion && <p className="text-red-500">{errors?.personalDetail?.religion.message}</p>}
    </div>

    <div className="mb-4">
        <label htmlFor="personalDetail" className="block text-gray-700 font-semibold mb-2 dark:text-white">Nationality*</label>
        <input type="text" id="personalDetail" name="personalDetail" {...register('personalDetail.nationality')} placeholder="ie. Bangladeshi, Indian..." className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
        {errors?.personalDetail?.nationality && <p className="text-red-500">{errors.personalDetail?.nationality.message}</p>}
    </div>

    <div className="mb-4">
    <label htmlFor="personalDetail" className="block text-gray-700 font-semibold mb-2 dark:text-white">Marital Status*</label>
        <select id="personalDetail" name="personalDetail" {...register('personalDetail.maritalStatus')} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500">
            <option value="">Select marital status...</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
        </select>
        {errors?.personalDetail?.maritalStatus && <p className="text-red-500">{errors?.personalDetail?.maritalStatus?.message}</p>}
    </div>

    <div className="mb-4">
      <label htmlFor="personalDetail" className="block text-gray-700 font-semibold mb-2 dark:text-white">Blood Group*</label>
      <select id="personalDetail" name="personalDetail" {...register('personalDetail.bloodGroup')} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500">
          <option value="">Select blood group...</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
      </select>
      {errors?.personalDetail?.bloodGroup && <p className="text-red-500">{errors.personalDetail?.bloodGroup.message}</p>}
  </div>

    <div className="mb-4">
        <label htmlFor="personalDetail" className="block text-gray-700 font-semibold mb-2 dark:text-white">Your Height*</label>
        <input type="text" id="personalDetail" name="personalDetail" {...register('personalDetail.height')} placeholder="Your Height ie 5 Feet 11 Inch.." className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
        {errors?.personalDetail?.height && <p className="text-red-500">{errors.personalDetail?.height?.message}</p>}
    </div>


    <div className="mb-4">
      <label htmlFor="mySignature" className="block text-gray-700 font-semibold mb-2 dark:text-white">Your Signature*</label>
      <input type="text" id="mySignature" name="mySignature" {...register('mySignature')} placeholder="Your Unique Signature..." className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
      {errors?.mySignature && <p className="text-red-500">{errors?.mySignature?.message}</p>}
    </div>


    <div className="mb-4">
      <label htmlFor="declaration" className="block text-gray-700 font-semibold mb-2 dark:text-white">Declarations*</label>
      <input type="text" id="declaration" name="GPA" {...register('declaration')} placeholder="add declarations..." className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
    </div>

  
    
      {/* Add more input fields for other fields in the schema */}
    <div className="mb-4">
        <Button label="Add Resume" color="white" bgColor="black" />
    </div>
    </form>
  )
}

export default AddResumeForm

