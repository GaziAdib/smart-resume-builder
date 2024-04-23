import EducationCard from "../cards/EducationCard"

const Educations = ({educations}) => {
  return (
    <>
    {educations?.map((education) => {
      return <EducationCard key={education.id} education={education}  />
    })}</>
    
  )
}

export default Educations