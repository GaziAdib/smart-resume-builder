const Interests = ({interests}) => {
  return (

    <div  style={{pageBreakAfter: 'always', pageBreakInside: 'avoid'}} className="container rounded-md py-2 my-2 mx-auto justify-center items-center">
    <div className="bg-blue-300 text-gray-900 my-2 py-2 px-2 shadow-sm border-2 border-l-gray-900 ">
        <p className="text-xl font-semibold">My Interests</p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {interests?.map((interest, index) => (
            <div key={index} className="justify-start text-lg ml-2 rounded-lg  text-gray-600">
              <li>{interest}</li>
            </div>
          ))}
    </div>  
</div>

  )
}

export default Interests

