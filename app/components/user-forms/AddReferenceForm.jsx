"use client";

import Button from "@/app/ui/Button";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod';
import { useRouter } from "next/navigation";

const schema = z.object({
  name: z.string().trim().min(5, {message: 'Please enter for Person Name with atleast 5 characters'}),
  company: z.string().trim().min(3, {message: 'Please enter for Company Name with atleast 3 characters'}),
  position: z.string().trim().min(3, {message: 'Please enter position or role'}),
  email: z.string().trim().min(1, {message: 'email is required'}).email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(1, {message: 'phone number is required'}).refine(value => {
    const phoneRegex = /^[0-9\s()+-]*$/;
    return phoneRegex.test(value);
  }, { message: 'Please enter a valid phone number' }),
  address: z.string().trim().min(1, {message: 'Please enter a address'}),
  relationship: z.string().trim().min(1, {message: 'Please enter a relationship'}),
});


const AddReferenceForm = () => {


  const router = useRouter();

  const { register, handleSubmit, reset, formState: {errors}} = useForm({
    resolver: zodResolver(schema)
  });
  
  const onSubmit = async (data) => {
    try {
          const res = await fetch('/api/user/resume/add-reference', {
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
              toast.success('New Reference Added', {
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
    <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Add References</h2>
    <div className="mb-4">
      <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Name*</label>
      <input type="text" id="name" name="name" {...register('name', {required: true})} placeholder="Reference Name (Person)" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300" />
      {errors?.name && <p className="text-red-500">{errors?.name.message}</p>}
    </div>
    <div className="mb-4">
      <label htmlFor="company" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Company</label>
      <input type="text" id="company" name="company" {...register('company')} placeholder="Uniliver, Robi, Bkash, Bank" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300" />
      {errors?.company && <p className="text-red-500">{errors?.company.message}</p>}
    </div>
    <div className="mb-4">
      <label htmlFor="position" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Position*</label>
      <input type="text" id="position" name="position" {...register('position', {required: true})} placeholder="HR, Manager, Director..." className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300" />
      {errors?.position && <p className="text-red-500">{errors?.position.message}</p>}
    </div>
    <div className="mb-4">
      <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Email*</label>
      <input type="email" id="email" name="email" {...register('email', {required: true})} placeholder="example@gmail.com" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300" />
      {errors?.email && <p className="text-red-500">{errors?.email.message}</p>}
    </div>
    <div className="mb-4">
      <label htmlFor="phone" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Phone Number*</label>
      <input type="phone" id="phone" name="phone" {...register('phone', {required: true})} placeholder="+880-10101010" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300" />
      {errors?.phone && <p className="text-red-500">{errors?.phone.message}</p>}
    </div>
    <div className="mb-4">
      <label htmlFor="address" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Address*</label>
      <input type="text" id="address" name="address" {...register('address', {required: true})} placeholder="561, West Wood Road, Dhaka-2021" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300" />
      {errors?.address && <p className="text-red-500">{errors?.address.message}</p>}
    </div>
    <div className="mb-4">
      <label htmlFor="relationship" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Relationship*</label>
      <input type="text" id="relationship" name="relationship" {...register('relationship', {required: true})} placeholder="uncle, relatives, brother, sister..." className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300" />
      {errors?.relationship && <p className="text-red-500">{errors?.relationship.message}</p>}
    </div>
    <div className="mb-4">
    <Button label="Add Reference" color="white" bgColor="black" />
    </div>
  </form>
    
  )
}

export default AddReferenceForm

{/* <form onSubmit={handleSubmit(onSubmit)} className="mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-6">Add References</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name*</label>
        <input type="text" id="name" name="name" {...register('name', {required: true})} placeholder="Reference Name (Person)" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
        {errors?.name && <p className="text-red-500">{errors?.name.message}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="company" className="block text-gray-700 font-semibold mb-2">Company</label>
        <input type="text" id="company" name="company" {...register('company')} placeholder="Uniliver, Robi, Bkash, Bank" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
        {errors?.company && <p className="text-red-500">{errors?.company.message}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="position" className="block text-gray-500 font-semibold mb-2">Position*</label>
        <input type="text" id="position" name="position" {...register('position', {required: true})} placeholder="HR, Manager, Director..." className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
        {errors?.position && <p className="text-red-500">{errors?.position.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-500 font-semibold mb-2">Email*</label>
        <input type="email" id="email" name="email" {...register('email', {required: true})} placeholder="example@gmail.com" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
        {errors?.email && <p className="text-red-500">{errors?.email.message}</p>}
      </div>


      <div className="mb-4">
        <label htmlFor="phone" className="block text-gray-500 font-semibold mb-2">Phone Number*</label>
        <input type="phone" id="phone" name="phone" {...register('phone', {required: true})} placeholder="+880-10101010" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
        {errors?.phone && <p className="text-red-500">{errors?.phone.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="address" className="block text-gray-500 font-semibold mb-2">Address*</label>
        <input type="text" id="address" name="address" {...register('address', {required: true})} placeholder="561, West Wood Road, Dhaka-2021" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
        {errors?.address && <p className="text-red-500">{errors?.address.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="relationship" className="block text-gray-500 font-semibold mb-2">Relationship*</label>
        <input type="text" id="relationship" name="relationship" {...register('relationship', {required: true})} placeholder="uncle, relatives, brother, sister..." className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
        {errors?.relationship && <p className="text-red-500">{errors?.relationship.message}</p>}
      </div>


      <div className="mb-4">
        <Button label="Add Reference" color="white" bgColor="black" />
      </div>
    </form> */}