'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSettings } from 'react-icons/fi';
import CertificateCard from '../cards/CertificateCard';

const Certificates = ({ certificates, setting }) => {
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
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const hoverVariants = {
    initial: { opacity: 0, scale: 0.9 },
    hover: { opacity: 1, scale: 1 }
  };

  if (!setting?.showWorkExperience) return null;

  return (
    <>
      <div style={{ pageBreakAfter: 'always', pageBreakInside: 'avoid' }}></div>
      
      <motion.div 
        className="container py-4 my-4 mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Header with color changing ability */}
        <motion.div 
          className={`py-4 px-6 relative flex justify-between items-center rounded-t-lg`}
          style={{ backgroundColor: headerBgColor }}
          layout
        >
          <motion.h2 
            className="text-xl mx-auto font-semibold text-slate-900"
            layout="position"
          >
            Certifications
          </motion.h2>
          
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="flex items-center"
                initial="initial"
                animate="hover"
                exit="initial"
                variants={hoverVariants}
              >
                <label htmlFor="header-color" className="cursor-pointer">
                  <FiSettings className="text-gray-900 dark:text-white hover:text-gray-200" size={20} />
                </label>
                <input
                  id="header-color"
                  type="color"
                  value={headerBgColor}
                  onChange={handleColorChange}
                  className="w-6 h-6 cursor-pointer opacity-0 absolute dark:text-white"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Certificates List */}
        <motion.div 
          className="mt-4 space-y-4 dark:bg-gray-800"
          variants={containerVariants}
        >
          {certificates?.map((certificate) => (
            <motion.div
              key={certificate?.id}
              variants={itemVariants}
              whileHover={{ y: -2 }}
              className="dark:bg-gray-900 shadow-sm  duration-200 dark:border-gray-600"
            >
              <CertificateCard certificate={certificate} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <div style={{ pageBreakAfter: 'always', pageBreakInside: 'avoid' }}></div>
    </>
  );
}

export default Certificates;



// "use client";

// import { useState } from 'react';
// import CertificateCard from '../cards/CertificateCard';

// const Certificates = ({ certificates, setting }) => {
//   const [headerBgColor, setHeaderBgColor] = useState('#ffffff'); // Initial color
//   const [isHovered, setIsHovered] = useState(false);

//   const handleColorChange = (event) => {
//     setHeaderBgColor(event.target.value);
//   };

//   return (
// <>
// <div style={{ pageBreakAfter: 'always', pageBreakInside: 'avoid' }} className="container rounded-md py-2 my-2 mx-auto justify-center items-center relative group"></div>
//   <div className="container rounded-md py-2 my-2 mx-auto justify-center items-center relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
//   <div className={` text-gray-900 my-4 py-2 px-2  border-l-gray-900`} style={{ backgroundColor: headerBgColor }}>
//         <p className="text-xl font-semibold text-center">My Certificates</p>
//         {isHovered && (
//           <input type="color" value={headerBgColor} onChange={handleColorChange} className="absolute right-4 top-4 cursor-pointer" />
//         )}
//       </div>
//       <hr className='w-1/2 mx-auto' />
//         {setting?.showWorkExperience && (
//           <div>
//             {certificates?.map((certificate) => (
//               <CertificateCard key={certificate?.id} certificate={certificate} />
//             ))}
//           </div>
//         )}
//       </div>

//   <div style={{ pageBreakAfter: 'always', pageBreakInside: 'avoid' }} ></div>
// </>
    
//   );
// }

// export default Certificates;