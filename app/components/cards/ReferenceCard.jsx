const ReferenceCard = ({index, reference}) => {

  const {name, position, company, phone, relationship, email, address} = reference || {};


  return (
    <div className="bg-white border-2 my-2 py-4 rounded-lg p-4">
    <h3 className="text-lg font-medium mb-2">{name}</h3>
    <p className="text-gray-600 font-semibold">Position: <span className="font-normal">{position}</span></p>
    <p className="text-gray-600 font-semibold">Company: <span className="font-normal">{company}</span></p>
    <p className="text-gray-600 font-semibold">Relationship: <span className="font-normal">{relationship}</span></p>
    <p className="text-gray-600 font-semibold">Address: <span className="font-normal">{address}</span></p>
    <p className="text-gray-600 font-semibold">Email: <span className="font-normal">{email}</span></p>
    <p className="text-gray-600 font-semibold">Phone: <span className="font-normal">{phone}</span></p>
  </div>
  //   <div className="bg-white shadow-md rounded-md py-4 px-6 mt-4">
  //   <h2 className="text-xl font-semibold mb-4">References {index+1}</h2>
  //   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  //     <div className="flex flex-col">
  //       <label className="text-gray-700 font-semibold mb-1">Name</label>
  //       <p className="text-gray-600">{name}</p>
  //     </div>
  //     <div className="flex flex-col">
  //       <label className="text-gray-700 font-semibold mb-1">Position</label>
  //       <p className="text-gray-600">{position}</p>
  //     </div>
  //     <div className="flex flex-col">
  //       <label className="text-gray-700 font-semibold mb-1">Company</label>
  //       <p className="text-gray-600">{company}</p>
  //     </div>
  //     <div className="flex flex-col">
  //       <label className="text-gray-700 font-semibold mb-1">Relationship</label>
  //       <p className="text-gray-600">{relationship}</p>
  //     </div>
  //     <div className="flex flex-col">
  //       <label className="text-gray-700 font-semibold mb-1">Phone</label>
  //       <p className="text-gray-600">{phone}</p>
  //     </div>
  //     <div className="flex flex-col">
  //       <label className="text-gray-700 font-semibold mb-1">Email</label>
  //       <p className="text-gray-600">{email}</p>
  //     </div>
  //     <div className="flex flex-col">
  //       <label className="text-gray-700 font-semibold mb-1">Address</label>
  //       <p className="text-gray-600">{address}</p>
  //     </div>
  //   </div>
  // </div>
  )
}

export default ReferenceCard


