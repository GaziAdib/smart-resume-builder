import moment from "moment";

const ProjectCard = ({ project }) => {
  const {
    projectTitle,
    projectLiveLink,
    projectGitLink,
    projectAchievements,
    startDate,
    endDate,
  } = project || {};

  return (
    <div className="bg-white dark:bg-gray-900 border-l-2 border-l-gray-300 dark:border-l-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 py-4 px-4 mb-4 w-full mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 flex-wrap">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100">
            {projectTitle?.toUpperCase()}
          </h2>
          <div className="flex gap-2">
            {projectLiveLink && (
              <a
                href={projectLiveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm sm:text-base font-medium text-blue-500 dark:text-blue-400 hover:underline transition-colors duration-200"
              >
                Live Demo
              </a>
            )}
            {projectGitLink && (
              <a
                href={projectGitLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm sm:text-base font-medium text-gray-600 dark:text-gray-300 hover:underline transition-colors duration-200"
              >
                GitHub
              </a>
            )}
          </div>
        </div>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 whitespace-nowrap">
          <span className="font-medium">Duration: </span>
          {moment(startDate).format("DD MMM, YYYY")} -{" "}
          {endDate ? moment(endDate).format("DD MMM, YYYY") : "Present"}
        </p>
      </div>

      {projectAchievements?.length > 0 && (
        <div className="mt-2">
          <p className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-200 mb-1">
            Achievements:
          </p>
          <ul className="list-disc ml-5 space-y-1">
            {projectAchievements.map((achievement, index) => (
              <li
                key={index}
                className="text-sm sm:text-base text-gray-600 dark:text-gray-300"
              >
                {achievement}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;







// import moment from "moment";

// const ProjectCard = ({project}) => {

//   const {projectTitle, projectLiveLink, projectGitLink, projectAchievements, startDate, endDate } = project || {};

//   return (
//     <div className="bg-white border-l-2 border-l-gray-200 dark:bg-gray-900 dark:border-l-gray-700 rounded-md py-2 px-3 mt-2">
//       <div className="flex justify-between items-center mb-2">
//               <div className="flex items-center space-x-2">
//                 <h2 className="text-xl font-semibold">{projectTitle.toUpperCase()}</h2>
//                 <a href={projectLiveLink} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-400 dark:text-blue-300">
//                   LIVE |
//                 </a>
//                 <a href={projectGitLink} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-400 dark:text-blue-300">
//                   GITHUB
//                 </a>
//               </div>
//               <p className="text-gray-600 mb-1 dark:text-gray-300">
//                 <span className="font-semibold dark:text-gray-300">Duration:</span> {moment(startDate).format("DD MMM, YYYY")} - {endDate ? moment(endDate).format("DD MMM, YYYY") : 'Present'}
//               </p>
//             </div>
//       <div>
        
//       <p className="text-gray-600 mb-1 font-semibold dark:text-gray-300">Achievements:</p>
//       <ul className="list-disc ml-6">
//         {projectAchievements?.map((achievement, index) => (
//           <li key={index} className="text-gray-600 dark:text-gray-300">{achievement}</li>
//         ))}
//       </ul>
//     </div>
//     </div>
//   )
// }

// export default ProjectCard