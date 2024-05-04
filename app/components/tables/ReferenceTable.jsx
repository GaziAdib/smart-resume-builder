"use client";

const ReferenceTable = ({references}) => {
  return (
   
    <div className="overflow-x-auto">
    <table className="w-full bg-white border-collapse border rounded-lg">
      <thead className="bg-gray-100 text-gray-800">
        <tr>
          <th className="px-2 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider border-b">NAME</th>
          <th className="px-2 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider border-b">Position</th>
          <th className="px-2 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider border-b">Company</th>
          <th className="hidden md:table-cell px-2 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider border-b">Relationship</th>
          <th className="hidden md:table-cell px-2 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider border-b">Phone</th>
          <th className="hidden md:table-cell px-2 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider border-b">Email</th>
        </tr>
      </thead>
      <tbody className="text-gray-700">
        {references?.map((reference, index) => (
          <tr key={index} className="border-b">
            <td className="px-2 py-3 sm:px-6 sm:py-4 whitespace-nowrap border-r">{reference?.name?.toUpperCase()}</td>
            <td className="px-2 py-3 sm:px-6 sm:py-4 whitespace-nowrap border-r">{reference.position}</td>
            <td className="px-2 py-3 sm:px-6 sm:py-4 whitespace-nowrap border-r">{reference?.company}</td>
            <td className="hidden md:table-cell px-2 py-3 sm:px-6 sm:py-4 whitespace-nowrap border-r">{reference?.relationship}</td>
            <td className="hidden md:table-cell px-2 py-3 sm:px-6 sm:py-4 whitespace-nowrap border-r">{reference.phone}</td>
            <td className="hidden md:table-cell px-2 py-3 sm:px-6 sm:py-4 whitespace-nowrap border-r">{reference.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
    
  
  )
}

export default ReferenceTable