"use client";

import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaGlobe } from 'react-icons/fa';


const HeroSection = ({profileImage,currentUserInfo}) => {

   const {username, phone, email, website} = currentUserInfo || {};

  return (

    <div className="container rounded-md  py-4 my-2 mx-auto justify-center items-center">
      <div className="container items-center justify-center lg:justify-between md:justify-between  flex flex-col md:flex-row lg:flex-row mt-2 py-2 rounded-sm ">
            {/* Profile Image */}
            <div className="mb-4 md:mb-0 lg:mb-0 md:order-2 lg:order-2">
              <div className="rounded-sm shadow-sm overflow-hidden border-4 border-white">
                <img
                  className="w-32 h-32 object-cover"
                  src={profileImage ? profileImage : 'https://avatars.githubusercontent.com/u/41202696?v=4'}
                  alt={username}
                />
              </div>
            </div>

            {/* User Information */}
            <div className="md:order-1 w-1/2 lg:order-1 shadow-sm rounded-lg p-4">
              <p className="text-lg font-semibold mt-2 mb-4 mx-2 flex items-center">
                <span className="mr-2">{username.toUpperCase()}</span>
              </p>
              <p className="text-md mx-2 my-2 flex items-center">
                <FaMapMarkerAlt className="text-gray-600 mr-2" />
                <span>521, East Jurain, Dhaka-1204</span>
              </p>
              <p className="text-md mx-2 my-2 flex items-center">
                <FaEnvelope className="text-gray-600 mr-2" />
                <span>{email}</span>
              </p>
              <p className="text-md mx-2 my-2 flex items-center">
                <FaPhone className="text-gray-600 mr-2" />
                <span>{phone}</span>
              </p>
              <p className="text-md mx-2 my-2 flex items-center">
                <FaGlobe className="text-gray-600 mr-2" />
                <span>{website ?? 'Not Provided'}</span>
              </p>
            </div>
          </div>
    </div>

   
  )
}

export default HeroSection

