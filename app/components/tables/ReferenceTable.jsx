"use client";

const ReferenceTable = ({ references }) => {
  return (
    <div className="w-full">
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left border-b">
            <th className="p-2 font-medium">Name</th>
            <th className="p-2 font-medium">Position</th>
            <th className="p-2 font-medium">Company</th>
            <th className="p-2 font-medium hidden md:table-cell">Relationship</th>
            <th className="p-2 font-medium hidden lg:table-cell">Phone</th>
            <th className="p-2 font-medium hidden lg:table-cell">Email</th>
          </tr>
        </thead>
        <tbody>
          {references?.map((reference, index) => (
            <tr key={index} className="border-b">
              <td className="p-2 whitespace-nowrap">{reference?.name}</td>
              <td className="p-2 whitespace-nowrap">{reference.position}</td>
              <td className="p-2 whitespace-nowrap">{reference?.company}</td>
              <td className="p-2 whitespace-nowrap hidden md:table-cell">{reference?.relationship}</td>
              <td className="p-2 whitespace-nowrap hidden lg:table-cell">{reference.phone}</td>
              <td className="p-2 whitespace-nowrap hidden lg:table-cell">{reference.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {!references?.length && (
        <div className="w-full p-4 text-center">
          No references available
        </div>
      )}
    </div>
  );
};

export default ReferenceTable;