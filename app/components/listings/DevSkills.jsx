import { useState } from "react";

const DevSkills = ({devSkills, setting}) => {

const { programmingLanguages, frameworks, tools, platforms, softSkills } = devSkills[0];

const [headerBgColor, setHeaderBgColor] = useState('#9bedff'); // Initial color
const [isHovered, setIsHovered] = useState(false);

const handleColorChange = (event) => {
  setHeaderBgColor(event.target.value);
};

  return (
    
  <div className="container rounded-md py-2 my-2 mx-auto justify-center items-center relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
    <div className={` text-gray-900 my-4 py-2 px-2  border-l-gray-900`} style={{ backgroundColor: headerBgColor }}>
          <p className="text-xl font-semibold text-center">My Skills Summary</p>
          {isHovered && (
            <input type="color" value={headerBgColor} onChange={handleColorChange} className="absolute right-4 top-4 cursor-pointer" />
          )}
      </div>
      <hr className='w-1/2 mx-auto' />

  {/* Programming Languages */}
  <div className="mb-4 mt-4">
    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
      <li className="flex">
        <span className="text-lg font-semibold  px-2 dark:text-white w-32">Languages</span>: 
        <span className="ml-2">{programmingLanguages.join(', ')}</span>
      </li>
    </ul>
  </div>

  {/* Frameworks */}
  <div className="mb-4">
    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
      <li className="flex">
        <span className="text-lg font-semibold  px-2 dark:text-white w-32">Frameworks</span>: 
        <span className="ml-2">{frameworks.join(', ')}</span>
      </li>
    </ul>
  </div>

  {/* Tools */}
  <div className="mb-4">
    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
      <li className="flex">
        <span className="text-lg font-semibold px-2 dark:text-white w-32">Tools</span>: 
        <span className="ml-2">{tools?.join(', ')}</span>
      </li>
    </ul>
  </div>

  {/* Platforms */}
  <div className="mb-4">
    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
      <li className="flex">
        <span className="text-lg font-semibold px-2 dark:text-white w-32">Platforms</span>: 
        <span className="ml-2">{platforms?.join(', ')}</span>
      </li>
    </ul>
  </div>

  {/* Soft Skills */}
  <div className="mb-4">
    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
      <li className="flex">
        <span className="text-lg font-semibold  px-2 dark:text-white w-32">Soft Skills</span>: 
        <span className="ml-2">{softSkills?.join(', ')}</span>
      </li>
    </ul>
  </div>
  </div>


  )
}

export default DevSkills