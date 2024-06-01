"use client";

import { FiGrid, FiList } from 'react-icons/fi';
import { useState } from 'react';
import ReferenceCard from '../cards/ReferenceCard';
import ReferenceTable from '../tables/ReferenceTable';
import { usePathname } from 'next/navigation';


const References = ({ references, setting }) => {

   // get path name developer as for developer the view might be little different

   let fullpath = usePathname();

   fullpath = fullpath?.split('/')[3];

  const [view, setView] = useState('card');
  const [headerBgColor, setHeaderBgColor] = useState('#9bedff'); // Initial color
  const [isHovered, setIsHovered] = useState(false);

  const toggleView = () => {
    // Toggles between 'card' and 'table' views
    setView(prevView => (prevView === 'card' ? 'table' : 'card'));
  };

  const handleColorChange = (event) => {
    setHeaderBgColor(event.target.value);
  };

 if(setting?.showReference) {
  return (
    <>
    <div style={{ pageBreakAfter: 'always', pageBreakInside: 'avoid' }} className="container rounded-md py-2 my-2 mx-auto justify-center items-center relative group"></div>
    <div style={{ pageBreakAfter: 'always', pageBreakInside: 'avoid' }} className="container rounded-md py-2 my-2 mx-auto justify-center items-center relative group" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className={`bg-blue-300 text-gray-900 my-4 py-2 px-2 shadow-sm border-2 border-l-gray-900 group-hover:flex justify-between`} style={{ backgroundColor: headerBgColor }}>
      <p className={`text-xl font-semibold ${fullpath === 'developer' ? 'text-center' : ''}`}>My References</p>

    
      
        <div className="absolute right-0 top-0 mt-2 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <input type="color" value={headerBgColor} onChange={handleColorChange} className="mr-2 px-2 py-1 cursor-pointer bg-blue-500 text-white rounded-md" />
          <button onClick={toggleView} className="px-2 py-1 bg-blue-500 text-white rounded-md">
            {view === 'card' ? <FiList className="inline-block mr-1" /> : <FiGrid className="inline-block mr-1" />} {view === 'card' ? 'Table' : 'Card'}
          </button>
        </div>
      </div>

      <hr className='w-1/2 mx-auto' />

      <div className="grid mt-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center">
        
          {view === 'card' ? (
            references?.map((reference, index) => (
              <ReferenceCard key={reference.id} index={index} reference={reference} />
            ))
          ) : (
            <ReferenceTable references={references} />
          )}

      </div>
      
    </div>
    </>
   )
 }
}

export default References;

{/* <>
    <div style={{ pageBreakAfter: 'always', pageBreakInside: 'avoid' }} className="container rounded-md py-2 my-2 mx-auto justify-center items-center relative group"></div>
    <div style={{ pageBreakAfter: 'always', pageBreakInside: 'avoid' }} className="container rounded-md py-2 my-2 mx-auto justify-center items-center relative group" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className={`bg-blue-300 text-gray-900 my-4 py-2 px-2 shadow-sm border-2 border-l-gray-900 group-hover:flex justify-between`} style={{ backgroundColor: headerBgColor }}>
        <p className="text-xl font-semibold">Educational Qualifications</p>
        <div className="absolute right-0 top-0 mt-2 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <input type="color" value={headerBgColor} onChange={handleColorChange} className="mr-2 px-2 py-1 cursor-pointer bg-blue-500 text-white rounded-md" />
          <button onClick={toggleView} className="px-2 py-1 bg-blue-500 text-white rounded-md">
            {view === 'card' ? <FiList className="inline-block mr-1" /> : <FiGrid className="inline-block mr-1" />} {view === 'card' ? 'Table' : 'Card'}
          </button>
        </div>
      </div>
      {view === 'card' ? (
        educations?.map((education) => (
          <EducationCard key={education.id} education={education} />
        ))
      ) : (
        <EducationTable educations={educations} />
      )}
    </div>
    </> */}