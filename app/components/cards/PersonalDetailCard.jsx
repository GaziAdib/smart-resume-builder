const PersonalDetailCard = ({personalDetail, setting}) => {

  const {fatherName, motherName, dob, religion, nationality, maritalStatus, bloodGroup, height} = personalDetail || {};

  if(setting?.showPersonalDetail) {
    return (
      <div style={{pageBreakAfter: 'always', pageBreakInside: 'avoid'}} className="container rounded-md py-2 my-2 mx-auto justify-center items-center">
      <div className="bg-blue-300 text-gray-900 my-2 py-2 px-2 shadow-sm border-2 border-l-gray-900 ">
          <p className="text-xl font-semibold">Personal Details</p>
      </div>

      <div className="bg-white shadow-md rounded-md p-6">
          <h2 className="text-xl font-semibold mb-4">Personal Details</h2>
          <table className="w-full text-left">
            <tbody>
              <tr>
                <th className="pb-2 text-gray-600">Father's Name:</th>
                <td className="pb-2">{fatherName}</td>
              </tr>
              <tr>
                <th className="pb-2 text-gray-600">Mother's Name:</th>
                <td className="pb-2">{motherName}</td>
              </tr>
              <tr>
                <th className="pb-2 text-gray-600">Date of Birth:</th>
                <td className="pb-2">{dob}</td>
              </tr>
              <tr>
                <th className="pb-2 text-gray-600">Religion:</th>
                <td className="pb-2">{religion}</td>
              </tr>
              <tr>
                <th className="pb-2 text-gray-600">Nationality:</th>
                <td className="pb-2">{nationality}</td>
              </tr>
              <tr>
                <th className="pb-2 text-gray-600">Marital Status:</th>
                <td className="pb-2">{maritalStatus}</td>
              </tr>
              <tr>
                <th className="pb-2 text-gray-600">Blood Group:</th>
                <td className="pb-2">{bloodGroup}</td>
              </tr>
              <tr>
                <th className="pb-2 text-gray-600">Height:</th>
                <td className="pb-2">{height}</td>
              </tr>
            </tbody>
          </table>
      </div>

    </div>
    )
  }
}

export default PersonalDetailCard

