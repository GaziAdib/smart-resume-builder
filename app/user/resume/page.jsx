import { fetchCurrentUser, fetchEducationalQualifications, fetchResume } from "@/app/actions/user-actions"
import HeroSection from "@/app/components/cards/HeroSection";
import PersonalDetailCard from "@/app/components/cards/PersonalDetailCard";
import Educations from "@/app/components/listings/Educations";


const MyResumePage = async () => {

  const educations = await fetchEducationalQualifications();
  const resumeInfo = await fetchResume();
  const currentUserInfo = await fetchCurrentUser()


  return (
    <>
    <h1>My Resume</h1>
    <div className="main-wrapper">

    <div className="container rounded-md  py-4 my-2 mx-auto justify-center items-center">
        <HeroSection profileImage={resumeInfo?.profileImage} currentUserInfo={currentUserInfo} />
    </div>

      <div className="container rounded-md  py-4 my-2 mx-auto justify-center items-center">
        <div className="bg-blue-300 text-gray-900 my-4 py-2 px-2 shadow-md border-2 border-l-gray-900 ">
            <p className="text-xl font-semibold">Educational Qualifications</p>
        </div>
        <Educations educations={educations} />
      </div>

      <div className="container rounded-md  py-4 my-2 mx-auto justify-center items-center">
        <div className="bg-blue-300 text-gray-900 my-4 py-2 px-2 shadow-md border-2 border-l-gray-900 ">
            <p className="text-xl font-semibold">Personal Details</p>
        </div>
        <PersonalDetailCard personalDetail={resumeInfo?.personalDetail} />
      </div>
    </div>
      
    </>
  )
}

export default MyResumePage