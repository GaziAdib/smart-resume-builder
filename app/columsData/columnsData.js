// "use client";

// import { useRouter } from "next/navigation";

// export const projectColumns = [
//     { header: "Project Title", accessor: "projectTitle" },
//     { header: "Project Git Link", accessor: "projectGitLink", render: (value) => <a href={value} className="text-blue-400 hover:text-blue-600 underline">Git Link</a> },
//     { header: "Project Live Link", accessor: "projectLiveLink", render: (value) => <a href={value} className="text-blue-400 hover:text-blue-600 underline">Live Link</a> },
//     { header: "Start Date", accessor: "startDate" },
//     { header: "End Date", accessor: "endDate" },
//     { header: "Actions", accessor: "actions", render: (_, item) => (
//         <>
//           <a href="#" className="text-blue-400 hover:text-blue-600 underline">Edit</a>
//           <a href="#" className="text-blue-400 hover:text-blue-600 underline pl-6">Remove</a>
//         </>
//       ) 
//     }
// ];




// // const removeProject = async (itemId) => {
// //   await deleteItem('remove-project', itemId);
// // };



// const deleteItem = async (path,itemId) => {

//   // Implement your API call here
//   try {
//     const response = await fetch(`/api/user/resume/delete-resume/${path}/${itemId}`, {
//       method: 'DELETE',
//     });
//     if (response.ok) {
//       window?.location?.reload();
//       alert('Course deleted successfully!');
//     } 
//     if (!response.ok) {
//       throw new Error('Failed to delete the course');
//     }

//   } catch (error) {
//     console.error("Error removing item:", error);
//   }
// };




// const removeCertificate = async (itemId) => {
//   alert(`ID: ${itemId}`);
//   if (!confirm('Are you sure you want to delete this course?')) {
//     return;
// }
//   await deleteItem('remove-certificate', itemId);
// };


// export const certificateColumns = [
//     { header: "Certificate Title", accessor: "certificateTitle" },
//     { header: "Certificate From", accessor: "certificateFrom" },
//     { header: "Certificate Link", accessor: "certificateLink", render: (value) => <a href={value} className="text-blue-400 hover:text-blue-600 underline">Certificate Link</a> },
//     { header: "Start Date", accessor: "startDate" },
//     { header: "End Date", accessor: "endDate" },
//     { header: "Actions", accessor: "actions", render: (_, item) => (
//         <>
//           <a href="#" className="text-blue-400 hover:text-blue-600 underline">Edit</a>
//           <button  className="bg-red-300 text-gray-800 rounded-md px-2 mx-2" onClick={() => removeCertificate(item.id)}>Remove</button>
//         </>
//       ) 
//     }
// ];
  
