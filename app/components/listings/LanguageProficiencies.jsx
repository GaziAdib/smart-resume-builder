const LanguageProficiencies = ({languageProficiencies}) => {
  return (
    <ul className="list-disc ml-8">
    {languageProficiencies?.map((languageProficiency, index) => (
      <li key={index} className="text-gray-600">{languageProficiency}</li>
    ))}
  </ul>
  )
}

export default LanguageProficiencies