import { fetchCurrentUser, fetchEducationalQualifications, fetchMyReferences, fetchResume, fetchSetting, fetchSkills, fetchWorkExperiences } from "@/app/actions/user-actions"
import MyResume from "@/app/components/resume-detail/MyResume";

const MyResumePage = async () => {
  const educations = await fetchEducationalQualifications();
  const experiences = await fetchWorkExperiences()
  const resumeInfo = await fetchResume();
  const skills = await fetchSkills();
  const references = await fetchMyReferences();
  const currentUserInfo = await fetchCurrentUser()
  const setting = await fetchSetting();
  return (
    <>
  
        <MyResume  
          currentUserInfo={currentUserInfo}
          resumeInfo={resumeInfo}
          educations={educations}
          experiences={experiences}
          skills={skills}
          references={references}
          setting={setting}
          />
    </>
  )
}

export default MyResumePage
