"use client";
const ProjectManageTable = ({ columns, data }) => {
  return (
    <table className="border-collapse w-full">
    <thead>
      <tr>
        {columns.map((column, index) => (
          <th key={index} className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
            {column.header}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((item, rowIndex) => (
        <tr
          key={rowIndex}
          className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
        >
          {columns.map((column, colIndex) => (
            <td
              key={colIndex}
              className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static"
            >
              <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                {column.header}
              </span>
              {column.render ? column.render(item[column.accessor], item) : (
                item[column.accessor] instanceof Date ? item[column.accessor].toLocaleDateString() : item[column.accessor]
              )}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
  );
};

export default ProjectManageTable;












// "use client";
// import moment from "moment";
// import Link from "next/link";

// const ProjectManageTable = ({projects}) => {

//   return (
//     <table className="border-collapse w-full">
//     <thead>
//       <tr>
//         <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Project Title</th>
//         <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Project Git Link</th>
//         <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Project Live Link</th>
//         <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Start Date</th>
//         <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">End Date</th>
//         <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Actions</th>
//       </tr>
//     </thead>
//     <tbody>
//       {projects.map((project, index) => (
//         <tr
//           key={index}
//           className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
//         >
//           <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
//             <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Project Title</span>
//             {project.projectTitle}
//           </td>
//           <td className="w-full lg:w-auto p-3 text-gray-800  border border-b text-center block lg:table-cell relative lg:static">
//             <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Project Git Link</span>
//             <a href={project?.projectGitLink} className="text-blue-400 hover:text-blue-600 underline">
//               Git Link
//             </a>
//           </td>
//           <td className="w-full lg:w-auto p-3 text-gray-800  border border-b text-center block lg:table-cell relative lg:static">
//             <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Project Live Link</span>
//             <a href={project?.projectLiveLink} className="text-blue-400 hover:text-blue-600 underline">
//               Live Link
//             </a>
//           </td>
//           <td className="w-full lg:w-auto p-3 text-gray-800  border border-b text-center block lg:table-cell relative lg:static">
//             <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Start Date</span>
//             {moment(project?.startDate).format("DD MMM, YYYY")}
//           </td>
//           <td className="w-full lg:w-auto p-3 text-gray-800  border border-b text-center block lg:table-cell relative lg:static">
//             <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">End Date</span>
//             {moment(project?.endDate).format("DD MMM, YYYY")}
//           </td>
//           <td className="w-full lg:w-auto p-3 text-gray-800  border border-b text-center block lg:table-cell relative lg:static">
//             <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Actions</span>
//             <Link href="#" className="bg-green-600 text-gray-50  rounded-md px-3 hover:bg-green-800 cursor-pointer">
//               Add
//             </Link>
//             <button className="bg-red-200 px-2 mx-2 cursor-pointer rounded-md text-gray-600 hover:text-blue-600">
//               Remove
//             </button>
//           </td>
//         </tr>
//       ))}
//     </tbody>
//   </table>
//   )
// }

// export default ProjectManageTable

