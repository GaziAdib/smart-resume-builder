import { fetchCurrentUser, fetchEducationalQualifications, fetchResume, fetchWorkExperiences } from "@/app/actions/user-actions"
import CareerObjectiveCard from "@/app/components/cards/CareerObjectiveCard";
import HeroSection from "@/app/components/cards/HeroSection";
import PersonalDetailCard from "@/app/components/cards/PersonalDetailCard";
import Educations from "@/app/components/listings/Educations";
import Experiences from "@/app/components/listings/Experiences";


const MyResumePage = async () => {

  const educations = await fetchEducationalQualifications();
  const experiences = await fetchWorkExperiences()
  const resumeInfo = await fetchResume();
  const currentUserInfo = await fetchCurrentUser()


  return (
    <>
    <h1>My Resume</h1>
    <div className="main-wrapper mx-2 px-2 py-3 my-3">

    <div className="container rounded-md  py-4 my-2 mx-auto justify-center items-center">
        <HeroSection profileImage={resumeInfo?.profileImage} currentUserInfo={currentUserInfo} />
    </div>

    <div className="container rounded-md  py-4 my-2 mx-auto justify-center items-center">
        <div className="bg-blue-300 text-gray-900 my-4 py-2 px-2 shadow-md border-2 border-l-gray-900 ">
            <p className="text-xl font-semibold">Career Objective</p>
        </div>
      <CareerObjectiveCard careerObjective={resumeInfo?.careerObjective} />
    </div>

    {experiences?.length > 0 &&
      <div className="container rounded-md py-2 my-2 mx-auto justify-center items-center">
        <div className="bg-blue-300 text-gray-900 my-4 py-2 px-2 shadow-md border-2 border-l-gray-900 ">
            <p className="text-xl font-semibold">Work Experiences</p>
        </div>
        <Experiences experiences={experiences} />
      </div>
    }

    <div className="container rounded-md py-2 my-2 mx-auto justify-center items-center">
      <div className="bg-blue-300 text-gray-900 my-4 py-2 px-2 shadow-md border-2 border-l-gray-900 ">
          <p className="text-xl font-semibold">Educational Qualifications</p>
      </div>
      <Educations educations={educations} />
    </div>

      <div className="container rounded-md  py-2 my-2 mx-auto justify-center items-center">
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