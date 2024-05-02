const HeroSection = ({profileImage,currentUserInfo}) => {

   const {username, phone, email} = currentUserInfo || {};

  return (

    <div className="container rounded-md  py-4 my-2 mx-auto justify-center items-center">
      <div className="container items-center justify-center lg:justify-between md:justify-between  flex flex-col md:flex-row lg:flex-row mt-2 py-2 rounded-sm shadow-sm">
            {/* Profile Image */}
            <div className="mb-4 md:mb-0 lg:mb-0 md:order-2 lg:order-2">
              <div className="rounded-sm shadow-sm overflow-hidden border-4 border-white">
                <img
                  className="w-32 h-32 object-cover"
                  src={profileImage ? profileImage : 'https://avatars.githubusercontent.com/u/41202696?v=4'}
                  alt={username}
                />
              </div>
            </div>

            {/* User Information */}
            <div className="md:order-1 lg:order-1">
              <p className="text-lg font-semibold mt-2 mx-2 px-2 py-2">{username.toUpperCase()}</p>
              <p className="text-md mx-2 px-2">521, East Jurain, Dhaka-1204</p>
              <p className="text-md mx-2 px-2">{email}</p>
              <p className="text-md mx-2 px-2">{phone}</p>
            </div>
          </div>
    </div>

   
  )
}

export default HeroSection

