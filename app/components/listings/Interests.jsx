const Interests = ({interests}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {interests?.map((interest, index) => (
        <div key={index} className="justify-start text-lg ml-2 rounded-lg  text-gray-600">
           <li>{interest}</li>
        </div>
      ))}
    </div>  
  )
}

export default Interests