import moment from "moment";

const ProjectCard = ({project}) => {

  const {projectTitle, projectLiveLink, projectGitLink, projectAchievements, startDate, endDate } = project || {};

  return (
    <div className="bg-white border-l-2 border-l-gray-200 dark:bg-gray-900 dark:border-l-gray-700 rounded-md py-2 px-3 mt-2">
      <div className="flex justify-between items-center mb-2">
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-semibold">{projectTitle.toUpperCase()}</h2>
                <a href={projectLiveLink} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-400 dark:text-blue-300">
                  LIVE |
                </a>
                <a href={projectGitLink} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-400 dark:text-blue-300">
                  GITHUB
                </a>
              </div>
              <p className="text-gray-600 mb-1 dark:text-gray-300">
                <span className="font-semibold dark:text-gray-300">Duration:</span> {moment(startDate).format("DD MMM, YYYY")} - {endDate ? moment(endDate).format("DD MMM, YYYY") : 'Present'}
              </p>
            </div>
      <div>
        
      <p className="text-gray-600 mb-1 font-semibold dark:text-gray-300">Achievements:</p>
      <ul className="list-disc ml-6">
        {projectAchievements?.map((achievement, index) => (
          <li key={index} className="text-gray-600 dark:text-gray-300">{achievement}</li>
        ))}
      </ul>
    </div>
    </div>
  )
}

export default ProjectCard