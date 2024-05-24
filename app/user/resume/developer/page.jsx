import { fetchCurrentUser, fetchEducationalQualifications, fetchMyCertificates, fetchMyProjects, fetchMyReferences, fetchResume, fetchSetting, fetchSkills, fetchWorkExperiences } from "@/app/actions/user-actions"
import MyDeveloperResume from "@/app/components/resume-detail/MyDeveloperResume";

const MyDeveloperResumePage = async () => {

  const resumeInfo = await fetchResume();
  const educations = await fetchEducationalQualifications();
  const experiences = await fetchWorkExperiences()
  const skills = await fetchSkills();
  const references = await fetchMyReferences();
  const projects = await fetchMyProjects();
  const certificates = await fetchMyCertificates();
  const currentUserInfo = await fetchCurrentUser()
  const setting = await fetchSetting();

  return (
    <>
        <MyDeveloperResume
          currentUserInfo={currentUserInfo}
          resumeInfo={resumeInfo}
          educations={educations}
          experiences={experiences}
          skills={skills}
          references={references}
          projects={projects}
          certificates={certificates}
          setting={setting}
        />
    </>
  )
}

export default MyDeveloperResumePage
