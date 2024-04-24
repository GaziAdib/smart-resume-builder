const Interests = ({interests}) => {
  return (
    <div className="grid mt-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {interests?.map((interest, index) => (
        <div key={index} className="justify-start text-xl ml-2 rounded-lg p-2 text-gray-600">
           <li>{interest}</li>
        </div>
      ))}
    </div>  
  )
}

export default Interests