import moment from "moment";

const ExperienceCard = ({experience}) => {

  const {jobTitle, companyName, jobResposibilities, startDate, endDate } = experience || {};

  return (
    <div className="bg-white border-l-2 border-l-gray-200 dark:bg-gray-900 dark:border-l-gray-700 rounded-md py-2 px-3 mt-2">
      <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{jobTitle?.toUpperCase()}</h2>
      <p className="text-gray-700 mb-1">
        <span className="font-semibold dark:text-gray-300">({companyName})</span> 
      </p>

      <div className="flex flex-col sm:flex-row justify-between">
        <p className="text-gray-600 mb-1 dark:text-gray-300">
          <span className="font-semibold dark:text-gray-300">Duration:</span> {moment(startDate).format("DD MMM, YYYY")} - {endDate ? moment(endDate).format("DD MMM, YYYY") : 'Present'}
        </p>
      </div>
      <div>
        
      <p className="text-gray-600 mb-1 font-semibold dark:text-gray-300">Responsibilities:</p>
      <ul className="list-disc ml-6">
        {jobResposibilities?.map((responsibility, index) => (
          <li key={index} className="text-gray-600 dark:text-gray-300">{responsibility}</li>
        ))}
      </ul>
    </div>
    </div>
  )
}

export default ExperienceCard