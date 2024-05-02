const LanguageProficiencies = ({languageProficiencies}) => {
  return (
    <div style={{pageBreakAfter: 'always', pageBreakInside: 'avoid'}} className="container rounded-md py-2 my-2 mx-auto justify-center items-center">
        <div className="bg-blue-300 text-gray-900 my-4 py-2 px-2 shadow-sm border-2 border-l-gray-900 ">
            <p className="text-xl font-semibold">Language Proficiencies</p>
        </div>
        <ul className="list-disc ml-8">
          {languageProficiencies?.map((languageProficiency, index) => (
            <li key={index} className="text-gray-600">{languageProficiency}</li>
          ))}
        </ul>
      </div>
  
  )
}

export default LanguageProficiencies

