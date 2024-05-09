"use client";


import { useState } from "react";

const ReferenceCard = ({ index, reference}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedReference, setEditedReference] = useState({ ...reference });

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedReference((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/user/resume/update-resume/reference/${reference.id}`, {
          method: 'PUT',
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(editedReference)
      })

      if (!res.ok) {
          console.log('There is some problem in getting response');
      }

      if (res.ok) {
          toast.success('Reference updated!', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
          });
         
      }
  
    } catch (error) {
        console.log('error Updating References', error)
    }
    setIsEditing(false);
  };

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      await handleSave(); // Trigger save action when Enter key is pressed
    }
  };

  return (
    <div
      className="bg-white border-2 my-2 py-4 rounded-lg p-4"
      onDoubleClick={handleDoubleClick}
    >
      <h3 className="text-lg font-medium mb-2">
        {isEditing ? (
          <input
            type="text"
            name="name"
            className="w-full px-2 py-1 rounded-md mb-2"
            value={editedReference.name}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        ) : (
          editedReference.name
        )}
      </h3>
      <p className="text-gray-600 font-semibold">
        Position:{" "}
        {isEditing ? (
          <input
            type="text"
            name="position"
            className="w-full px-2 py-1 rounded-md mb-2"
            value={editedReference.position}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        ) : (
          editedReference.position
        )}
      </p>
      <p className="text-gray-600 font-semibold">
        Company:{" "}
        {isEditing ? (
          <input
            type="text"
            name="company"
            className="w-full px-2 py-1 rounded-md mb-2"
            value={editedReference.company}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        ) : (
          editedReference.company
        )}
      </p>

      <p className="text-gray-600 font-semibold">
        Relationship:{" "}
        {isEditing ? (
          <input
            type="text"
            name="relationship"
            className="w-full px-2 py-1 rounded-md mb-2"
            value={editedReference.relationship}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        ) : (
          editedReference.relationship
        )}
      </p>
      <p className="text-gray-600 font-semibold">
        Address:{" "}
        {isEditing ? (
          <input
            type="text"
            name="relationship"
            className="w-full px-2 py-1 rounded-md mb-2"
            value={editedReference.address}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        ) : (
          editedReference.address
        )}
      </p>

      <p className="text-gray-600 font-semibold">
        Email:{" "}
        {isEditing ? (
          <input
            type="email"
            name="email"
            className="w-full px-2 py-1 rounded-md mb-2"
            value={editedReference.email}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        ) : (
          editedReference.email
        )}
      </p>

      <p className="text-gray-600 font-semibold">
        Phone:{" "}
        {isEditing ? (
          <input
            type="phone"
            name="phone"
            className="w-full px-2 py-1 rounded-md mb-2"
            value={editedReference.phone}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        ) : (
          editedReference.phone
        )}
      </p>
      {/* Add similar input fields for other properties */}
      {isEditing && <span className="text-sm font-semibold text-green-700 text-start">Editing 🖊️ ...</span>}
    </div>
  );
};

export default ReferenceCard;










// const ReferenceCard = ({index, reference}) => {

//   const {name, position, company, phone, relationship, email, address} = reference || {};


//   return (
//     <div className="bg-white border-2 my-2 py-4 rounded-lg p-4">
//     <h3 className="text-lg font-medium mb-2">{name}</h3>
//     <p className="text-gray-600 font-semibold">Position: <span className="font-normal">{position}</span></p>
//     <p className="text-gray-600 font-semibold">Company: <span className="font-normal">{company}</span></p>
//     <p className="text-gray-600 font-semibold">Relationship: <span className="font-normal">{relationship}</span></p>
//     <p className="text-gray-600 font-semibold">Address: <span className="font-normal">{address}</span></p>
//     <p className="text-gray-600 font-semibold">Email: <span className="font-normal">{email}</span></p>
//     <p className="text-gray-600 font-semibold">Phone: <span className="font-normal">{phone}</span></p>
//   </div>
  
//   )
// }

// export default ReferenceCard


