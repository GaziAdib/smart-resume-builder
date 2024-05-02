const CareerObjectiveCard = ({careerObjective}) => {
  return (
    <div className="container rounded-md  py-4 my-2 mx-auto justify-center items-center">
      <div className="bg-gray-50 text-gray-900 my-4 py-2 px-2 shadow-sm  border-2 border-l-gray-900 ">
          <p className="text-xl font-semibold">Career Objective</p>
      </div>
    <div>
        <p className="text-lg text-justify font-serif">{careerObjective}</p> 
    </div>
</div>
    
  )
}

export default CareerObjectiveCard

