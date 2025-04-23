"use client";
import { FaEnvelope, FaPhone, FaGlobe, FaLinkedin, FaGithub } from 'react-icons/fa';

const HeroSection = ({ profileImage, currentUserInfo }) => {
  const { username, phone, email, website, linkedin, github } = currentUserInfo || {};

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      {/* Profile Image - Always on top */}
      <div className="flex justify-center mb-6">
        <div className="w-32 h-32 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-md">
          <img
            className="w-full h-full object-cover"
            src={profileImage || 'https://avatars.githubusercontent.com/u/41202696?v=4'}
            alt={`${username || 'User'} profile`}
          />
        </div>
      </div>

      {/* Name */}
      <h1 className="text-xl md:text-2xl my-2 py-2 lg:text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
        {username}
      </h1>

      {/* Contact Info - Horizontal on desktop, vertical on mobile */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4 mb-6">
        {email && (
          <div className="flex items-center">
            <FaEnvelope className="text-gray-500 dark:text-gray-400 mr-2" />
            <a 
              href={`mailto:${email}`} 
              className="text-sm md:text-base text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              {email}
            </a>
          </div>
        )}

        {phone && (
          <>
            <span className="hidden md:inline text-gray-400">|</span>
            <div className="flex items-center">
              <FaPhone className="text-gray-500 dark:text-gray-400 mr-2" />
              <a 
                href={`tel:${phone}`} 
                className="text-sm md:text-base text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                {phone}
              </a>
            </div>
          </>
        )}

  {website && (
          <>
            <span className="hidden md:inline text-gray-400">|</span>
            <div className="flex items-center">
              <FaGlobe className="text-gray-500 dark:text-gray-400 mr-2" />
              <a 
                href={website.startsWith('http') ? website : `https://${website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm md:text-base text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Website
              </a>
            </div>
          </>
        )}

{github && (
          <>
            <span className="hidden md:inline text-gray-400">|</span>
            <div className="flex items-center">
              <FaGithub className="text-gray-500 dark:text-gray-400 mr-2" />
              <a 
                href={github} 
                className="text-sm md:text-base text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Github
              </a>
            </div>
          </>
        )}

      

      </div>

      {/* Social Links - Only icons */}
      <div className="flex justify-center space-x-4">
        {linkedin && (
          <a 
            href={linkedin} 
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-blue-700 dark:hover:text-blue-400"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="w-5 h-5" />
          </a>
        )}
        {github && (
          <a 
            href={github} 
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-400"
            aria-label="GitHub"
          >
            <FaGithub className="w-5 h-5" />
          </a>
        )}
      </div>
    </div>
  );
};

export default HeroSection;



// "use client";
// import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaGlobe, FaLinkedin, FaGithub } from 'react-icons/fa';

// const HeroSection = ({ profileImage, currentUserInfo }) => {
//   const { username, phone, email, website, linkedin, github } = currentUserInfo || {};

//   return (
//     <div className="w-full container  mx-auto px-4 py-8">
//       <div className="flex flex-col lg:flex-row items-center gap-8">
//         {/* Profile Image - Top on mobile, Left on desktop */}
//         <div className="w-40 h-40 lg:w-48 lg:h-48 rounded-lg overflow-hidden border-2 border-gray-100 dark:border-gray-700 shadow-sm">
//           <img
//             className="w-full h-full object-cover"
//             src={profileImage || 'https://avatars.githubusercontent.com/u/41202696?v=4'}
//             alt={`${username || 'User'} profile`}
//           />
//         </div>

//         {/* Contact Information */}
//         <div className="flex-1 space-y-4">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
//               {username}
//             </h1>
//             <div className="h-1 w-16 bg-blue-500 my-2"></div>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div className="flex items-start space-x-3">
//               <FaEnvelope className="mt-1 text-gray-500 dark:text-gray-400" />
//               <div>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
//                 <a 
//                   href={`mailto:${email}`} 
//                   className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
//                 >
//                   {email}
//                 </a>
//               </div>
//             </div>

//             <div className="flex items-start space-x-3">
//               <FaPhone className="mt-1 text-gray-500 dark:text-gray-400" />
//               <div>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
//                 <a 
//                   href={`tel:${phone}`} 
//                   className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
//                 >
//                   {phone}
//                 </a>
//               </div>
//             </div>

//             <div className="flex items-start space-x-3">
//               <FaMapMarkerAlt className="mt-1 text-gray-500 dark:text-gray-400" />
//               <div>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
//                 <p className="text-gray-900 dark:text-white">521, East Jurain, Dhaka-1204</p>
//               </div>
//             </div>

//             <div className="flex items-start space-x-3">
//               <FaGlobe className="mt-1 text-gray-500 dark:text-gray-400" />
//               <div>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">Website</p>
//                 {website ? (
//                   <a 
//                     href={website.startsWith('http') ? website : `https://${website}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
//                   >
//                     {website.replace(/^https?:\/\//, '')}
//                   </a>
//                 ) : (
//                   <p className="text-gray-500 dark:text-gray-400">Not provided</p>
//                 )}
//               </div>
//             </div>
//           </div>

//           {(linkedin || github) && (
//             <div className="flex space-x-4 pt-2">
//               {linkedin && (
//                 <a 
//                   href={linkedin} 
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-gray-500 hover:text-blue-700 dark:hover:text-blue-400"
//                   aria-label="LinkedIn"
//                 >
//                   <FaLinkedin className="w-5 h-5" />
//                 </a>
//               )}
//               {github && (
//                 <a 
//                   href={github} 
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-400"
//                   aria-label="GitHub"
//                 >
//                   <FaGithub className="w-5 h-5" />
//                 </a>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroSection;



// "use client";

// import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaGlobe } from 'react-icons/fa';


// const HeroSection = ({profileImage,currentUserInfo}) => {

//    const {username, phone, email, website} = currentUserInfo || {};

//   return (

//     <div className="container rounded-md  py-4 my-2 mx-auto justify-center items-center">
//       <div className="container items-center justify-center lg:justify-between md:justify-between  flex flex-col md:flex-row lg:flex-row mt-2 py-2 rounded-sm ">
//             {/* Profile Image */}
//             <div className="mb-4 md:mb-0 lg:mb-0 md:order-2 lg:order-2">
//               <div className="rounded-sm shadow-sm overflow-hidden border-4 border-white">
//                 <img
//                   className="w-32 h-32 object-cover"
//                   src={profileImage ? profileImage : 'https://avatars.githubusercontent.com/u/41202696?v=4'}
//                   alt={username}
//                 />
//               </div>
//             </div>

//             {/* User Information */}
//             <div className="md:order-1 w-1/2 lg:order-1 shadow-sm rounded-lg p-4">
//               <p className="text-lg font-semibold mt-2 mb-4 mx-2 flex items-center">
//                 <span className="mr-2">{username?.toUpperCase()}</span>
//               </p>
//               <p className="text-md mx-2 my-2 flex items-center">
//                 <FaMapMarkerAlt className="text-gray-600 mr-2" />
//                 <span>521, East Jurain, Dhaka-1204</span>
//               </p>
//               <p className="text-md mx-2 my-2 flex items-center">
//                 <FaEnvelope className="text-gray-600 mr-2" />
//                 <span>{email}</span>
//               </p>
//               <p className="text-md mx-2 my-2 flex items-center">
//                 <FaPhone className="text-gray-600 mr-2" />
//                 <span>{phone}</span>
//               </p>
//               <p className="text-md mx-2 my-2 flex items-center">
//                 <FaGlobe className="text-gray-600 mr-2" />
//                 <span>{website ?? 'Not Provided'}</span>
//               </p>
//             </div>
//           </div>
//     </div>

   
//   )
// }

// export default HeroSection

