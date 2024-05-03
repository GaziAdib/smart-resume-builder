import moment from "moment";

const EducationTable = ({ educations }) => {
    return (
      <div className="overflow-x-auto">
        <table className="w-full bg-white border-collapse border rounded-lg">
          <thead className="bg-gray-100 text-gray-800">
            <tr>
              <th className="px-2 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider border-b">Subject</th>
              <th className="px-2 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider border-b">Institution</th>
              <th className="px-2 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider border-b">Degree</th>
              <th className="px-2 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider border-b">GPA/CGPA</th>
              <th className="hidden md:table-cell px-2 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider border-b">Duration</th>
            </tr>
            
          </thead>
          <tbody className="text-gray-700">
            {educations?.map((education) => (
              <tr key={education.id} className="border-b">
                <td className="px-2 py-3 sm:px-6 sm:py-4 whitespace-nowrap border-r">{education.subject.toUpperCase()}</td>
                <td className="px-2 py-3 sm:px-6 sm:py-4 whitespace-nowrap border-r">{education.institution}</td>
                <td className="px-2 py-3 sm:px-6 sm:py-4 whitespace-nowrap border-r">{education.degree}</td>
                <td className="hidden md:table-cell px-2 py-3 sm:px-6 sm:py-4 whitespace-nowrap border-r">{education.GPA}</td>
                <td className="px-2 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
                  <p className="text-gray-600">
                    {moment(education.startDate).format("MMM YYYY")} - {education.endDate ? moment(education.endDate).format("MMM YYYY") : 'Present'}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default EducationTable;