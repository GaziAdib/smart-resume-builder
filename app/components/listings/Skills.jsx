const Skills = ({skills}) => {
  return (
    <ul className="list-disc ml-8">
      {skills?.map((skill, index) => (
        <li key={index} className="text-gray-600 py-0.5">{skill?.name}</li>
      ))}
  </ul>
    
  )
}

export default Skills