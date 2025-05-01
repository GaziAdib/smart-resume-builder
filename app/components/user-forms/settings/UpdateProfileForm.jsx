"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const profileSchema = z.object({
profileImageUrl: z.string().url('Enter a valid Image Url'),
  website: z.string().url("Enter a valid website URL"),
  phone: z
    .string()
    .min(11, "Phone number must be at least 11 digits")
    .regex(/^\d+$/, "Phone number must contain only digits"),
  linkedin: z.string().url("Enter a valid LinkedIn URL"),
  github: z.string().url("Enter a valid GitHub URL"),
});

const UpdateProfileForm = ({currentUserData}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
  });

  const onSubmit = async (data) => {
     try {
            const res = await fetch(`/api/user/profile/update/${currentUserData?.id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
    
            if (!res.ok) {
                console.log('There is some problem in getting response');
            }
    
            if (res.ok) {
                toast.success('Profile Updated succesfully', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        
      } catch (error) {
          console.log('error', error)
      }
      };
 

  return (
    <div className="my-8 py-6 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 shadow-lg rounded-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        Update Profile
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Profile Image Url
          </label>
          <input
            type="url"
            defaultValue={currentUserData?.profileImageUrl}
            {...register("profileImageUrl")}
            className={`w-full px-4 py-2 rounded-lg border text-sm bg-gray-50 dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.profileImageUrl ? "border-red-500" : ""
            }`}
          />
          {errors.profileImageUrl && (
            <p className="text-red-500 text-xs mt-1">{errors.profileImageUrl.message}</p>
          )}
        </div>

        {/* Website */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Website
          </label>
          <input
            type="url"
            defaultValue={currentUserData?.website}
            {...register("website")}
            className={`w-full px-4 py-2 rounded-lg border text-sm bg-gray-50 dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.website ? "border-red-500" : ""
            }`}
          />
          {errors.website && (
            <p className="text-red-500 text-xs mt-1">{errors.website.message}</p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            defaultValue={currentUserData?.phone}
            {...register("phone")}
            className={`w-full px-4 py-2 rounded-lg border text-sm bg-gray-50 dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.phone ? "border-red-500" : ""
            }`}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* LinkedIn */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            LinkedIn
          </label>
          <input
            type="url"
            defaultValue={currentUserData?.linkedin}
            {...register("linkedin")}
            className={`w-full px-4 py-2 rounded-lg border text-sm bg-gray-50 dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.linkedin ? "border-red-500" : ""
            }`}
          />
          {errors.linkedin && (
            <p className="text-red-500 text-xs mt-1">{errors.linkedin.message}</p>
          )}
        </div>

        {/* GitHub */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            GitHub
          </label>
          <input
            type="url"
            defaultValue={currentUserData?.github}
            {...register("github")}
            className={`w-full px-4 py-2 rounded-lg border text-sm bg-gray-50 dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.github ? "border-red-500" : ""
            }`}
          />
          {errors.github && (
            <p className="text-red-500 text-xs mt-1">{errors.github.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfileForm;
