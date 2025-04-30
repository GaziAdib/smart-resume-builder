"use client";

const ReferenceTable = ({ references }) => {
  return (
    <div className="w-full my-6 overflow-hidden rounded-lg shadow-sm">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300">
            <tr className="text-left">
              <th className="px-6 py-3 font-semibold uppercase text-xs tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 font-semibold uppercase text-xs tracking-wider">
                Position
              </th>
              <th className="px-6 py-3 font-semibold uppercase text-xs tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 font-semibold uppercase text-xs tracking-wider hidden md:table-cell">
                Relationship
              </th>
              <th className="px-6 py-3 font-semibold uppercase text-xs tracking-wider hidden lg:table-cell">
                Phone
              </th>
              <th className="px-6 py-3 font-semibold uppercase text-xs tracking-wider hidden lg:table-cell">
                Email
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900/50">
            {references?.length > 0 ? (
              references.map((reference, index) => (
                <tr 
                  key={index} 
                  className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/30"
                >
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-gray-100">
                    {reference?.name || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">
                    {reference?.position || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">
                    {reference?.company || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300 hidden md:table-cell">
                    {reference?.relationship || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300 hidden lg:table-cell">
                    {reference?.phone || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300 hidden lg:table-cell">
                    {reference?.email || '-'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td 
                  colSpan={6} 
                  className="px-6 py-8 text-center text-gray-500 dark:text-gray-400"
                >
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <svg
                      className="w-12 h-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                    <p className="text-sm font-medium">No references available</p>
                    <p className="text-xs text-gray-400">Add references to display them here</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReferenceTable;

