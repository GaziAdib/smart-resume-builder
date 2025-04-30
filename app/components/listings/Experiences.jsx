"use client";

import { useEffect, useState } from 'react';
import ExperienceCard from "../cards/ExperienceCard";
import { usePathname } from 'next/navigation';

const Experiences = ({ experiences, setting }) => {

  
  let fullpath = usePathname();

  fullpath = fullpath.split('/')[3];
  
  const [headerBgColor, setHeaderBgColor] = useState('#ffffff');
  const [isHovered, setIsHovered] = useState(false);
  const [pageBgColor, setPageBgColor] = useState('#ffffff');

  const defaultSettings = {
    showPersonalDetail: false,
    showEducation: true,
    showWorkExperience: true,
    ...setting 
  };

  const handleColorChange = (event) => {
    setHeaderBgColor(event.target.value);
  };

  const handlePageColorChange = (event) => {
    setPageBgColor(event.target.value);
  };

   // Apply the background color to the body
   useEffect(() => {
    document.body.style.backgroundColor = pageBgColor;
  }, [pageBgColor]);


  if (!defaultSettings?.showWorkExperience) return null;

  return (
<>
      <div style={{ pageBreakAfter: 'always', pageBreakInside: 'avoid' }} className="container rounded-md py-2 my-2 mx-auto justify-center items-center relative group"></div>

      <div className={`container  rounded-md py-2 my-2 mx-auto justify-center items-center relative`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <div className={`bg-blue-300 text-gray-900 my-4 py-2 px-2 shadow-sm border-2 border-l-gray-900`} style={{ backgroundColor: headerBgColor }}>
          <p className={`text-xl font-semibold ${fullpath === 'developer' ? 'text-center' : ''}`}>Work Experiences</p>
          {isHovered && (
            <input type="color" value={headerBgColor} onChange={handleColorChange} className="absolute right-4 top-4 cursor-pointer" />
          )}
        </div>

        <hr className='w-1/2 mx-auto' />

        {defaultSettings?.showWorkExperience && (
          <div>
            {experiences?.map((experience) => (
              <ExperienceCard key={experience?.id} experience={experience} />
            ))}
          </div>
        )}
      </div>

      <div className="container hidden rounded-md py-2 my-2 mx-auto justify-center items-center relative">
        <label className="block mb-2">Change Page Background Color:</label>
        <input type="color" value={pageBgColor} onChange={handlePageColorChange} className="cursor-pointer" />
      </div>

      <div style={{ pageBreakAfter: 'always', pageBreakInside: 'avoid' }}></div>
    </>
    
  );
}

export default Experiences;












// "use client";

// import { useState } from 'react';
// import ExperienceCard from "../cards/ExperienceCard";
// import { usePathname } from 'next/navigation';

// const Experiences = ({ experiences, setting }) => {

//     // get path name developer as for developer the view might be little different

//     let fullpath = usePathname();

//     fullpath = fullpath.split('/')[3];
  

//   const [headerBgColor, setHeaderBgColor] = useState('#9bedff'); // Initial color
//   const [isHovered, setIsHovered] = useState(false);

//   const handleColorChange = (event) => {
//     setHeaderBgColor(event.target.value);
//   };

//   return (
// <>
// <div style={{ pageBreakAfter: 'always', pageBreakInside: 'avoid' }} className="container rounded-md py-2 my-2 mx-auto justify-center items-center relative group"></div>
// <div className="container rounded-md py-2 my-2 mx-auto justify-center items-center relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
//       <div className={`bg-blue-300 text-gray-900 my-4 py-2 px-2 shadow-sm border-2 border-l-gray-900`} style={{ backgroundColor: headerBgColor }}>
//         <p className={`text-xl font-semibold ${fullpath === 'developer' ? 'text-center' : ''}`}>Work Experiences</p>
//         {isHovered && (
//           <input type="color" value={headerBgColor} onChange={handleColorChange} className="absolute right-4 top-4 cursor-pointer" />
//         )}
//       </div>

//       <hr className='w-1/2 mx-auto' />

//       {setting?.showWorkExperience && (
//         <div>
//           {experiences?.map((experience) => (
//             <ExperienceCard key={experience?.id} experience={experience} />
//           ))}
//         </div>
//       )}
//     </div>

//     <div style={{ pageBreakAfter: 'always', pageBreakInside: 'avoid' }} ></div>
// </>
    
//   );
// }

// export default Experiences;