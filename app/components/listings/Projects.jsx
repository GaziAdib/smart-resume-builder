'use client';
import { useState } from 'react';
import ProjectCard from '../cards/ProjectCard';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSettings } from 'react-icons/fi';

const Projects = ({ projects, setting }) => {
  const [headerBgColor, setHeaderBgColor] = useState('#ffffff');
  const [isHovered, setIsHovered] = useState(false);

  const handleColorChange = (event) => {
    setHeaderBgColor(event.target.value);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const hoverVariants = {
    initial: { opacity: 0 },
    hover: { opacity: 1 }
  };

  return (
    <>
      <div style={{ pageBreakAfter: 'always', pageBreakInside: 'avoid' }} 
           className="container rounded-md py-2 my-2 mx-auto justify-center items-center relative group"></div>
      
      <motion.div
        className="container rounded-md py-2 my-2 mx-auto justify-center items-center relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className={`text-gray-900 my-4 py-3 px-4 border-l-gray-900 rounded-t-lg shadow-sm relative`}
          style={{ backgroundColor: headerBgColor }}
          whileHover={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
        >
          <p className="text-xl font-semibold text-center">My Projects</p>
          
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute right-4 top-1/2 -translate-y-1/2"
                initial="initial"
                animate="hover"
                exit="initial"
                variants={hoverVariants}
                transition={{ duration: 0.2 }}
              >
                <motion.div 
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <label htmlFor="header-color" className="cursor-pointer">
                    <FiSettings className="text-gray-700 hover:text-gray-900" size={20} />
                  </label>
                  <input
                    id="header-color"
                    type="color"
                    value={headerBgColor}
                    onChange={handleColorChange}
                    className="w-6 h-6 cursor-pointer opacity-0 absolute"
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.hr 
          className='w-1/2 mx-auto' 
          initial={{ width: 0 }}
          animate={{ width: '50%' }}
          transition={{ duration: 0.5 }}
        />

        <motion.div 
          className="grid gap-6 grid-cols-1"
          variants={containerVariants}
        >
          {projects?.map((project) => (
            <motion.div
              key={project?.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <div style={{ pageBreakAfter: 'always', pageBreakInside: 'avoid' }}></div>
    </>
  );
}

export default Projects;





// "use client";

// import { useState } from 'react';
// import ProjectCard from '../cards/ProjectCard';

// const Projects = ({ projects, setting }) => {
//   const [headerBgColor, setHeaderBgColor] = useState('#ffffff');
//   const [isHovered, setIsHovered] = useState(false);

//   const handleColorChange = (event) => {
//     setHeaderBgColor(event.target.value);
//   };

//   return (
// <>
// <div style={{ pageBreakAfter: 'always', pageBreakInside: 'avoid' }} className="container rounded-md py-2 my-2 mx-auto justify-center items-center relative group"></div>
// <div className="container rounded-md py-2 my-2 mx-auto justify-center items-center relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
//       <div className={` text-gray-900 my-4 py-2 px-2  border-l-gray-900`} style={{ backgroundColor: headerBgColor }}>
//         <p className="text-xl font-semibold text-center">My Projects</p>
//         {isHovered && (
//           <input type="color" value={headerBgColor} onChange={handleColorChange} className="absolute right-4 top-4 cursor-pointer" />
//         )}
//       </div>
//       <hr className='w-1/2 mx-auto' />
//         <div>
//           {projects?.map((project) => (
//             <ProjectCard key={project?.id} project={project} />
//           ))}
//         </div>
//     </div>

//     <div style={{ pageBreakAfter: 'always', pageBreakInside: 'avoid' }} ></div>
// </>
    
//   );
// }

// export default Projects;