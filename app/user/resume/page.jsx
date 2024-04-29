import { fetchCurrentUser, fetchEducationalQualifications, fetchResume, fetchSkills, fetchWorkExperiences } from "@/app/actions/user-actions"
import TestResume from "@/app/components/TestResume/TestResume";
import MyResume from "@/app/components/resume-detail/MyResume";

const MyResumePage = async () => {
  const educations = await fetchEducationalQualifications();
  const experiences = await fetchWorkExperiences()
  const resumeInfo = await fetchResume();
  const skills = await fetchSkills();
  const currentUserInfo = await fetchCurrentUser()
  return (
    <>
      <TestResume
        currentUserInfo={currentUserInfo}
        resumeInfo={resumeInfo}
        educations={educations}
        experiences={experiences}
        skills={skills} />
    </>
  )
}

export default MyResumePage
