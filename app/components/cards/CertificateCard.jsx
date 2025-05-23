import moment from "moment";

const CertificateCard = ({ certificate }) => {
  const {
    certificateTitle,
    certificateFrom,
    certificateLink,
    certificateAchievements,
    startDate,
    endDate,
  } = certificate || {};

  return (
    <div className="bg-white dark:bg-gray-900 border-l-2 border-l-gray-300 dark:border-l-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 py-4 px-4 mb-4 w-full mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 flex-wrap">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100">
            {certificateTitle?.toUpperCase()}
            {certificateFrom && <span className="font-medium"> ({certificateFrom})</span>}
          </h2>
          {certificateLink && (
            <a
              href={certificateLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm sm:text-base font-medium text-blue-500 dark:text-blue-400 hover:underline transition-colors duration-200"
            >
              View Certificate
            </a>
          )}
        </div>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 whitespace-nowrap">
          <span className="font-medium">Duration: </span>
          {moment(startDate).format("DD MMM, YYYY")} -{" "}
          {endDate ? moment(endDate).format("DD MMM, YYYY") : "Present"}
        </p>
      </div>

      {certificateAchievements?.length > 0 && (
        <div className="mt-2">
          <p className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-200 mb-1">
            Achievements:
          </p>
          <ul className="list-disc ml-5 space-y-1">
            {certificateAchievements?.map((achievement, index) => (
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

export default CertificateCard;



