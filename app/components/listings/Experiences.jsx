import ExperienceCard from "../cards/ExperienceCard"

const Experiences = ({experiences}) => {
  return (
    <>
    {experiences?.map((experience) => {
      return <ExperienceCard key={experience?.id} experience={experience} />
    })}
    </>
  )
}

export default Experiences