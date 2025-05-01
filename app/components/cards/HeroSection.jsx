'use client';
import { FaEnvelope, FaPhone, FaGlobe, FaLinkedin, FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';

const HeroSection = ({ profileImage, currentUserInfo }) => {
  const { username, phone, email, website, linkedin, github, title, location } = currentUserInfo || {};

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="w-full px-4 py-5 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-950">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 lg:gap-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Profile Image */}
          <motion.div 
            className="flex-shrink-0 order-1 lg:order-2"
            variants={itemVariants}
          >
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-xl group">
              <img
                src={profileImage || 'https://avatars.githubusercontent.com/u/41202696?v=4'}
                alt={`${username || 'User'} profile`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </motion.div>

          {/* Info */}
          <motion.div 
            className="flex-1 order-2 w-full lg:order-1 text-center lg:text-left"
            variants={containerVariants}
          >
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
              variants={itemVariants}
            >
              {username}
            </motion.h1>

            {title && (
              <motion.p 
                className="text-lg sm:text-xl text-blue-600 dark:text-blue-400 mb-6"
                variants={itemVariants}
              >
                {title}
              </motion.p>
            )}

            {location && (
              <motion.p 
                className="text-gray-600 dark:text-gray-400 mb-8 flex items-center justify-center lg:justify-start"
                variants={itemVariants}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {location}
              </motion.p>
            )}

            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl"
              variants={containerVariants}
            >
              {email && (
                <motion.div 
                  className="flex items-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  variants={itemVariants}
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 mr-3">
                    <FaEnvelope className="text-lg" />
                  </div>
                  <a href={`mailto:${email}`} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 break-all">
                    {email}
                  </a>
                </motion.div>
              )}

              {phone && (
                <motion.div 
                  className="flex items-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  variants={itemVariants}
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 mr-3">
                    <FaPhone className="text-lg" />
                  </div>
                  <a href={`tel:${phone}`} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 break-all">
                    {phone}
                  </a>
                </motion.div>
              )}

              {website && (
                <motion.div 
                  className="flex items-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  variants={itemVariants}
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 mr-3">
                    <FaGlobe className="text-lg" />
                  </div>
                  <a
                    href={website.startsWith('http') ? website : `https://${website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 break-all"
                  >
                    Website
                  </a>
                </motion.div>
              )}

              {github && (
                <motion.div 
                  className="flex items-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  variants={itemVariants}
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 mr-3">
                    <FaGithub className="text-lg" />
                  </div>
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 break-all"
                  >
                    GitHub
                  </a>
                </motion.div>
              )}

              {linkedin && (
                <motion.div 
                  className="flex items-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  variants={itemVariants}
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 mr-3">
                    <FaLinkedin className="text-lg" />
                  </div>
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 break-all"
                  >
                    LinkedIn
                  </a>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;






// "use client";
// import { FaEnvelope, FaPhone, FaGlobe, FaLinkedin, FaGithub } from 'react-icons/fa';

// const HeroSection = ({ profileImage, currentUserInfo }) => {
//   const { username, phone, email, website, linkedin, github } = currentUserInfo || {};

//   return (
//     <div className="w-full max-w-6xl mx-auto px-4 py-6">
//       {/* Profile Image - Always on top */}
//       <div className="flex justify-center mb-6">
//         <div className="w-32 h-32 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-md">
//           <img
//             className="w-full h-full object-cover"
//             src={profileImage || 'https://avatars.githubusercontent.com/u/41202696?v=4'}
//             alt={`${username || 'User'} profile`}
//           />
//         </div>
//       </div>

//       {/* Name */}
//       <h1 className="text-xl md:text-2xl my-2 py-2 lg:text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
//         {username}
//       </h1>

//       {/* Contact Info - Horizontal on desktop, vertical on mobile */}
//       <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4 mb-6">
//         {email && (
//           <div className="flex items-center">
//             <FaEnvelope className="text-gray-500 dark:text-gray-400 mr-2" />
//             <a 
//               href={`mailto:${email}`} 
//               className="text-sm md:text-base text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
//             >
//               {email}
//             </a>
//           </div>
//         )}

//         {phone && (
//           <>
//             <span className="hidden md:inline text-gray-400">|</span>
//             <div className="flex items-center">
//               <FaPhone className="text-gray-500 dark:text-gray-400 mr-2" />
//               <a 
//                 href={`tel:${phone}`} 
//                 className="text-sm md:text-base text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
//               >
//                 {phone}
//               </a>
//             </div>
//           </>
//         )}

//   {website && (
//           <>
//             <span className="hidden md:inline text-gray-400">|</span>
//             <div className="flex items-center">
//               <FaGlobe className="text-gray-500 dark:text-gray-400 mr-2" />
//               <a 
//                 href={website.startsWith('http') ? website : `https://${website}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-sm md:text-base text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
//               >
//                 Website
//               </a>
//             </div>
//           </>
//         )}

//   {github && (
//           <>
//             <span className="hidden md:inline text-gray-400">|</span>
//             <div className="flex items-center">
//               <FaGithub className="text-gray-500 dark:text-gray-400 mr-2" />
//               <a 
//                 href={github} 
//                 className="text-sm md:text-base text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
//               >
//                 Github
//               </a>
//             </div>
//           </>
//         )}

      

//       </div>

//       {/* Social Links - Only icons */}
//       <div className="flex justify-center space-x-4">
//         {linkedin && (
//           <a 
//             href={linkedin} 
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-gray-500 hover:text-blue-700 dark:hover:text-blue-400"
//             aria-label="LinkedIn"
//           >
//             <FaLinkedin className="w-5 h-5" />
//           </a>
//         )}
//         {github && (
//           <a 
//             href={github} 
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-400"
//             aria-label="GitHub"
//           >
//             <FaGithub className="w-5 h-5" />
//           </a>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HeroSection;



