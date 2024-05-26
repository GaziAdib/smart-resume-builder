"use client";

export const projectColumns = [
    { header: "Project Title", accessor: "projectTitle" },
    { header: "Project Git Link", accessor: "projectGitLink", render: (value) => <a href={value} className="text-blue-400 hover:text-blue-600 underline">Git Link</a> },
    { header: "Project Live Link", accessor: "projectLiveLink", render: (value) => <a href={value} className="text-blue-400 hover:text-blue-600 underline">Live Link</a> },
    { header: "Start Date", accessor: "startDate" },
    { header: "End Date", accessor: "endDate" },
    { header: "Actions", accessor: "actions", render: (_, item) => (
        <>
          <a href="#" className="text-blue-400 hover:text-blue-600 underline">Edit</a>
          <a href="#" className="text-blue-400 hover:text-blue-600 underline pl-6">Remove</a>
        </>
      ) 
    }
];

export const certificateColumns = [
    { header: "Certificate Title", accessor: "certificateTitle" },
    { header: "Certificate From", accessor: "certificateFrom" },
    { header: "Certificate Link", accessor: "certificateLink", render: (value) => <a href={value} className="text-blue-400 hover:text-blue-600 underline">Certificate Link</a> },
    { header: "Start Date", accessor: "startDate" },
    { header: "End Date", accessor: "endDate" },
    { header: "Actions", accessor: "actions", render: (_, item) => (
        <>
          <a href="#" className="text-blue-400 hover:text-blue-600 underline">Edit</a>
          <a href="#" className="text-blue-400 hover:text-blue-600 underline pl-6">Remove</a>
        </>
      ) 
    }
];
  
