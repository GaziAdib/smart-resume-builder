import moment from "moment"

const EducationCard = ({education}) => {
  return (
    <div className="bg-white border-l-2 border-l-gray-200 rounded-md py-2 px-3 mt-2">
      <h2 className="text-xl font-semibold mb-2">{education.subject.toUpperCase()}</h2>
      <p className="text-gray-600 mb-1">
        <span className="font-semibold">Institution/College:</span> {education.institution}
      </p>
      <p className="text-gray-600 mb-1">
        <span className="font-semibold">Degree:</span> {education.degree}
      </p>
      <p className="text-gray-600 mb-1">
        <span className="font-semibold">GPA:</span> {education.GPA}
      </p>
      <div className="flex flex-col sm:flex-row justify-between">
        <p className="text-gray-600 mb-1">
          <span className="font-semibold">Duration:</span> {moment(education.startDate).format("MMM YYYY")} - {education.endDate ? moment(education.endDate).format("MMM YYYY") : 'Present'}
        </p>
      </div>
    </div>
  )
}

export default EducationCard