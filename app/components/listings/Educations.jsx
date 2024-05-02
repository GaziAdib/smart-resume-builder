import EducationCard from "../cards/EducationCard"

const Educations = ({educations, setting}) => {

  if(setting?.showEducation) {
    return (

      <div style={{pageBreakAfter: 'always', pageBreakInside: 'avoid'}} className="container rounded-md py-2 my-2 mx-auto justify-center items-center">
      <div className="bg-blue-300 text-gray-900 my-4 py-2 px-2 shadow-sm border-2 border-l-gray-900 ">
          <p className="text-xl font-semibold">Educational Qualifications</p>
      </div>
      {educations?.map((education) => {
            return <EducationCard key={education.id} education={education}  />
        })}
    </div>
      
      
    )
  }
  
}

export default Educations

