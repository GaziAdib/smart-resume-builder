const Skills = ({skills}) => {
  return (

    <div  className={`container rounded-md py-2 my-2 mx-auto justify-center items-center`}>
                 <div className={`bg-blue-300 text-gray-900 my-2 py-2 px-2 shadow-sm border-2 border-l-gray-900`}>
                   <p className="text-xl font-semibold">My Skills</p>
                 </div>
                 <ul className="list-disc ml-8">
                  {skills?.map((skill, index) => (
                    <li key={index} className="text-gray-600 py-0.5">{skill?.name}</li>
                  ))}
              </ul>
      </div>
    
    
  )
}

export default Skills

