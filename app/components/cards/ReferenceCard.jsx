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
  
  )
}

export default ReferenceCard


