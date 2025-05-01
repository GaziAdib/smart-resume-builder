'use client';
import { FiGrid, FiList, FiArrowUp, FiArrowDown } from 'react-icons/fi';
import { useEffect, useState } from "react";
import EducationCard from "../cards/EducationCard";
import EducationTable from "../tables/EducationTable";
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

const Educations = ({ educations, setting }) => {
  let fullpath = usePathname();
  fullpath = fullpath.split('/')[3];

  const [view, setView] = useState('card');
  const [headerBgColor, setHeaderBgColor] = useState('#ffffff');
  const [isHovered, setIsHovered] = useState(false);
  const [sortedEducations, setSortedEducations] = useState([]);

  const defaultSettings = {
    showPersonalDetail: false,
    showEducation: true,
    showWorkExperience: true,
    ...setting 
  };

  useEffect(() => {
    setSortedEducations(educations);
  }, [educations]);

  const toggleView = () => {
    setView(prevView => (prevView === 'card' ? 'table' : 'card'));
  };

  const sortEducations = (order) => {
    const sortedList = [...sortedEducations].sort((a, b) => {
      if (order === 'asc') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });
    setSortedEducations(sortedList);
  };

  const handleColorChange = (event) => {
    setHeaderBgColor(event.target.value);
  };

  if (!defaultSettings?.showEducation) return null;

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
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const viewSwitchVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } }
  };

  return (
    <LayoutGroup>
      <div
        style={{ pageBreakAfter: 'always', pageBreakInside: 'avoid' }}
        className="container rounded-md py-2 my-2 mx-auto justify-center items-center relative group"
      ></div>
      
      <motion.div
        style={{ pageBreakAfter: 'always', pageBreakInside: 'avoid' }}
        className="container rounded-md py-2 my-2 mx-auto justify-center items-center relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className={`bg-blue-300 text-gray-900 my-4 py-2 px-2 shadow-sm border-2 border-l-gray-900 group-hover:flex justify-between rounded-t-lg`}
          style={{ backgroundColor: headerBgColor }}
          layout
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <motion.p 
            className={`text-xl font-semibold ${fullpath === 'developer' ? 'text-center' : ''}`}
            layout="position"
          >
            Educational Qualifications
          </motion.p>
          
          <motion.div 
            className="absolute right-0 top-0 mt-2 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2"
            layout
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <input
                type="color"
                value={headerBgColor}
                onChange={handleColorChange}
                className="w-8 h-8 cursor-pointer bg-white rounded-md border border-gray-300"
              />
            </motion.div>
            
            <motion.button 
              onClick={toggleView} 
              className="px-3 py-1 bg-blue-500 text-white rounded-md flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {view === 'card' ? <FiList className="inline-block mr-1" /> : <FiGrid className="inline-block mr-1" />}
              <span className="hidden sm:inline">{view === 'card' ? 'Table' : 'Card'}</span>
            </motion.button>
            
            <motion.button
              onClick={() => sortEducations('asc')}
              className="px-3 py-1 bg-green-500 text-white rounded-md flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiArrowUp className="inline-block mr-1" />
              <span className="hidden sm:inline">Asc</span>
            </motion.button>
            
            <motion.button
              onClick={() => sortEducations('desc')}
              className="px-3 py-1 bg-red-500 text-white rounded-md flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiArrowDown className="inline-block mr-1" />
              <span className="hidden sm:inline">Desc</span>
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.hr 
          className='w-1/2 mx-auto' 
          initial={{ width: 0 }}
          animate={{ width: '50%' }}
          transition={{ duration: 0.5 }}
        />

        <AnimatePresence mode="wait">
          {view === 'card' ? (
            <motion.div
              key="card-view"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-4 grid-cols-1"
            >
              {sortedEducations.map((education) => (
                <motion.div
                  key={education.id}
                  variants={itemVariants}
                  layout
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <EducationCard education={education} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="table-view"
              variants={viewSwitchVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="overflow-hidden"
            >
              <EducationTable educations={sortedEducations} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </LayoutGroup>
  );
};

export default Educations;










// "use client";

// import { FiGrid, FiList, FiArrowUp, FiArrowDown } from 'react-icons/fi';
// import { useEffect, useState } from "react";
// import EducationCard from "../cards/EducationCard";
// import EducationTable from "../tables/EducationTable";
// import { usePathname } from 'next/navigation';


// const Educations = ({ educations, setting }) => {


//   let fullpath = usePathname();

//   fullpath = fullpath.split('/')[3];

//   const [view, setView] = useState('card');
//   const [headerBgColor, setHeaderBgColor] = useState('#ffffff');
//   const [isHovered, setIsHovered] = useState(false);
//   const [sortedEducations, setSortedEducations] = useState([]);

//   const defaultSettings = {
//     showPersonalDetail: false,
//     showEducation: true,
//     showWorkExperience: true,
//     ...setting 
//   };
 

//   useEffect(() => {
//     setSortedEducations(educations);
//   }, [educations]);

//   const toggleView = () => {
//     setView(prevView => (prevView === 'card' ? 'table' : 'card'));
//   };

//   const sortEducations = (order) => {
//     const sortedList = [...sortedEducations].sort((a, b) => {
//       if (order === 'asc') {
//         return new Date(a.createdAt) - new Date(b.createdAt);
//       } else {
//         return new Date(b.createdAt) - new Date(a.createdAt);
//       }
//     });
//     setSortedEducations(sortedList);
//   };

//   const handleColorChange = (event) => {
//     setHeaderBgColor(event.target.value);
//   };

//   if (!defaultSettings?.showEducation) return null;

//   return (
//     <>
//       <div
//         style={{ pageBreakAfter: 'always', pageBreakInside: 'avoid' }}
//         className="container rounded-md py-2 my-2 mx-auto justify-center items-center relative group"
//       ></div>
//       <div
//         style={{ pageBreakAfter: 'always', pageBreakInside: 'avoid' }}
//         className="container  rounded-md py-2 my-2 mx-auto justify-center items-center relative group"
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         <div
//           className={`bg-blue-300 text-gray-900 my-4 py-2 px-2 shadow-sm border-2 border-l-gray-900 group-hover:flex justify-between`}
//           style={{ backgroundColor: headerBgColor }}
//         >
//           <p className={`text-xl font-semibold ${fullpath === 'developer' ? 'text-center' : ''}`}>Educational Qualifications</p>
          
//           <div className="absolute right-0 top-0 mt-2 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center">
//             <input
//               type="color"
//               value={headerBgColor}
//               onChange={handleColorChange}
//               className="mr-2 px-2 py-1 cursor-pointer bg-blue-500 text-white rounded-md"
//             />
//             <button onClick={toggleView} className="px-2 py-1 bg-blue-500 text-white rounded-md mr-2">
//               {view === 'card' ? <FiList className="inline-block mr-1" /> : <FiGrid className="inline-block mr-1" />}{' '}
//               {view === 'card' ? 'Table' : 'Card'}
//             </button>
//             <button
//               onClick={() => sortEducations('asc')}
//               className="px-2 py-1 bg-green-500 text-white rounded-md mr-2"
//             >
//               <FiArrowUp className="inline-block mr-1" /> Asc
//             </button>
//             <button
//               onClick={() => sortEducations('desc')}
//               className="px-2 py-1 bg-red-500 text-white rounded-md"
//             >
//               <FiArrowDown className="inline-block mr-1" /> Desc
//             </button>
//           </div>

          
//         </div>
//         <hr className='w-1/2 mx-auto' />

//         {view === 'card' ? (
//           sortedEducations.map((education) => (
//             <EducationCard key={education.id} education={education} />
//           ))
//         ) : (
//           <EducationTable educations={sortedEducations} />
//         )}
//       </div>
//     </>
//   );

  
// }

// export default Educations;