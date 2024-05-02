import ExperienceCard from "../cards/ExperienceCard"

const Experiences = ({experiences, setting}) => {
  if(setting?.showWorkExperience) {
    return (
      <div className={`container rounded-md py-2 my-2 mx-auto justify-center items-center`}>
      <div className={`bg-blue-300 text-gray-900 my-4 py-2 px-2 shadow-sm border-2 border-l-gray-900`}>
        <p className="text-xl font-semibold">Work Experiences</p>
      </div>
        {experiences?.map((experience) => {
          return <ExperienceCard key={experience?.id} experience={experience} />
        })}
    </div>
  
    )
  }
}

export default Experiences

