'use client';
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSettings } from "react-icons/fi";

const DevSkills = ({ devSkills, setting }) => {
  const {
    programmingLanguages = [],
    frameworks = [],
    tools = [],
    platforms = [],
    softSkills = [],
  } = devSkills && devSkills.length > 0 ? devSkills[0] : {};

  const [isHovered, setIsHovered] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 5, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="container py-2 my-2 mx-auto justify-center items-center relative"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        className="overflow-hidden"
      >
        {/* Header */}
        <motion.div 
          className="py-3 px-4 text-center relative border-b border-gray-200"
          layout
        >
          <motion.h2 
            className="text-xl font-semibold text-gray-900 dark:text-white"
            layout="position"
          >
            Dev Skills
          </motion.h2>
        </motion.div>
        
        {/* Content */}
        <motion.div 
          className="p-4 md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {/* Skills List */}
          <motion.div 
            className="space-y-4"
            variants={containerVariants}
          >
            {/* Programming Languages */}
            <motion.div 
              className="flex flex-col sm:flex-row"
              variants={itemVariants}
            >
              <span className="text-base font-medium text-gray-900 dark:text-white w-full sm:w-40 flex-shrink-0 mb-1 sm:mb-0">
                Coding Languages:
              </span>
              <span className="text-gray-700 dark:text-gray-200 sm:ml-2">
                {programmingLanguages.join(', ')}
              </span>
            </motion.div>

            {/* Frameworks */}
            <motion.div 
              className="flex flex-col sm:flex-row"
              variants={itemVariants}
            >
              <span className="text-base font-medium text-gray-900 dark:text-white w-full sm:w-40 flex-shrink-0 mb-1 sm:mb-0">
                Frameworks:
              </span>
              <span className="text-gray-700 dark:text-gray-200 sm:ml-2">
                {frameworks.join(', ')}
              </span>
            </motion.div>

            {/* Tools */}
            <motion.div 
              className="flex flex-col sm:flex-row"
              variants={itemVariants}
            >
              <span className="text-base font-medium text-gray-900 dark:text-white w-full sm:w-40 flex-shrink-0 mb-1 sm:mb-0">
                Tools:
              </span>
              <span className="text-gray-700 dark:text-gray-200 sm:ml-2">
                {tools?.join(', ')}
              </span>
            </motion.div>

            {/* Platforms */}
            <motion.div 
              className="flex flex-col sm:flex-row"
              variants={itemVariants}
            >
              <span className="text-base font-medium text-gray-900 dark:text-white w-full sm:w-40 flex-shrink-0 mb-1 sm:mb-0">
                Platforms:
              </span>
              <span className="text-gray-700 dark:text-gray-200 sm:ml-2">
                {platforms?.join(', ')}
              </span>
            </motion.div>

            {/* Soft Skills */}
            <motion.div 
              className="flex flex-col sm:flex-row"
              variants={itemVariants}
            >
              <span className="text-base font-medium dark:text-white text-gray-900 w-full sm:w-40 flex-shrink-0 mb-1 sm:mb-0">
                Soft Skills:
              </span>
              <span className="text-gray-700 dark:text-gray-200 sm:ml-2">
                {softSkills?.join(', ')}
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default DevSkills;








// "use client";

// import { useState } from "react";

// const DevSkills = ({ devSkills, setting }) => {
//   const {
//     programmingLanguages = [],
//     frameworks = [],
//     tools = [],
//     platforms = [],
//     softSkills = [],
//   } = devSkills && devSkills.length > 0 ? devSkills[0] : {};

//   const [headerBgColor, setHeaderBgColor] = useState('#ffffff');
//   const [isHovered, setIsHovered] = useState(false);

//   const handleColorChange = (event) => {
//     setHeaderBgColor(event.target.value);
//   };

//   return (
//     <div className="container py-2 my-2 mx-auto justify-center items-center relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
//       <div 
//         className=" overflow-hidden shadow-sm"
//         onMouseEnter={() => setIsHovered(true)} 
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         {/* Header */}
//         <div 
//           className={`text-gray-900 py-3 px-4 relative transition-colors duration-200`} 
//           style={{ backgroundColor: headerBgColor }}
//         >
//           <p className="text-xl font-semibold text-center">My Skills</p>
//           {isHovered && (
//             <input 
//               type="color" 
//               value={headerBgColor} 
//               onChange={handleColorChange} 
//               className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 cursor-pointer opacity-70 hover:opacity-100" 
//             />
//           )}
//         </div>
        
//         <div className="bg-white dark:bg-gray-900 p-2 md:p-6">
//           <hr className='w-1/2 mx-auto border-gray-200 dark:border-gray-200 my-2' />

//           {/* Skills List */}
//           <div className="space-y-3  md:space-y-4">
//             {/* Programming Languages */}
//             <div className="mt-4 flex flex-col sm:flex-row">
//               <span className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white w-full sm:w-32 flex-shrink-0 mb-1 sm:mb-0">
//                 Languages:
//               </span>
//               <span className="text-gray-700 dark:text-gray-300 sm:ml-2">
//                 {programmingLanguages.join(', ')}
//               </span>
//             </div>

//             {/* Frameworks */}
//             <div className="flex flex-col sm:flex-row">
//               <span className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white w-full sm:w-32 flex-shrink-0 mb-1 sm:mb-0">
//                 Frameworks:
//               </span>
//               <span className="text-gray-700 dark:text-gray-300 sm:ml-2">
//                 {frameworks.join(', ')}
//               </span>
//             </div>

//             {/* Tools */}
//             <div className="flex flex-col sm:flex-row">
//               <span className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white w-full sm:w-32 flex-shrink-0 mb-1 sm:mb-0">
//                 Tools:
//               </span>
//               <span className="text-gray-700 dark:text-gray-300 sm:ml-2">
//                 {tools?.join(', ')}
//               </span>
//             </div>

//             {/* Platforms */}
//             <div className="flex flex-col sm:flex-row">
//               <span className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white w-full sm:w-32 flex-shrink-0 mb-1 sm:mb-0">
//                 Platforms:
//               </span>
//               <span className="text-gray-700 dark:text-gray-300 sm:ml-2">
//                 {platforms?.join(', ')}
//               </span>
//             </div>

//             {/* Soft Skills */}
//             <div className="flex flex-col sm:flex-row">
//               <span className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white w-full sm:w-32 flex-shrink-0 mb-1 sm:mb-0">
//                 Soft Skills:
//               </span>
//               <span className="text-gray-700 dark:text-gray-300 sm:ml-2">
//                 {softSkills?.join(', ')}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DevSkills;








// import { useState } from "react";

// const DevSkills = ({devSkills, setting}) => {

//   const {
//     programmingLanguages = [],
//     frameworks = [],
//     tools = [],
//     platforms = [],
//     softSkills = [],
//   } = devSkills && devSkills.length > 0 ? devSkills[0] : {};

// const [headerBgColor, setHeaderBgColor] = useState('#ffffff');
// const [isHovered, setIsHovered] = useState(false);

// const handleColorChange = (event) => {
//   setHeaderBgColor(event.target.value);
// };

//   return (
    
//   <div className="container rounded-md py-2 my-2 mx-auto justify-center items-center relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
//     <div className={` text-gray-900 my-4 py-2 px-2  border-l-gray-900`} style={{ backgroundColor: headerBgColor }}>
//           <p className="text-xl font-semibold text-center">My Skills Summary</p>
//           {isHovered && (
//             <input type="color" value={headerBgColor} onChange={handleColorChange} className="absolute right-4 top-4 cursor-pointer" />
//           )}
//       </div>
//       <hr className='w-1/2 mx-auto' />

//   {/* Programming Languages */}
//   <div className="mb-4 mt-4">
//     <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
//       <li className="flex">
//         <span className="text-lg font-semibold  px-2 dark:text-white w-32">Languages</span>: 
//         <span className="ml-2">{programmingLanguages.join(', ')}</span>
//       </li>
//     </ul>
//   </div>

//   {/* Frameworks */}
//   <div className="mb-4">
//     <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
//       <li className="flex">
//         <span className="text-lg font-semibold  px-2 dark:text-white w-32">Frameworks</span>: 
//         <span className="ml-2">{frameworks.join(', ')}</span>
//       </li>
//     </ul>
//   </div>

//   {/* Tools */}
//   <div className="mb-4">
//     <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
//       <li className="flex">
//         <span className="text-lg font-semibold px-2 dark:text-white w-32">Tools</span>: 
//         <span className="ml-2">{tools?.join(', ')}</span>
//       </li>
//     </ul>
//   </div>

//   {/* Platforms */}
//   <div className="mb-4">
//     <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
//       <li className="flex">
//         <span className="text-lg font-semibold px-2 dark:text-white w-32">Platforms</span>: 
//         <span className="ml-2">{platforms?.join(', ')}</span>
//       </li>
//     </ul>
//   </div>

//   {/* Soft Skills */}
//   <div className="mb-4">
//     <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
//       <li className="flex">
//         <span className="text-lg font-semibold  px-2 dark:text-white w-32">Soft Skills</span>: 
//         <span className="ml-2">{softSkills?.join(', ')}</span>
//       </li>
//     </ul>
//   </div>
//   </div>


//   )
// }

// export default DevSkills