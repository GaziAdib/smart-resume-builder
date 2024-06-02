import { fetchCurrentUser, fetchEducationalQualifications, fetchMyCertificates, fetchMyDevSkills, fetchMyProjects, fetchMyReferences, fetchResume, fetchSetting, fetchSkills, fetchWorkExperiences } from "@/app/actions/user-actions"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import MyDeveloperResume from "@/app/components/resume-detail/MyDeveloperResume";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const MyDeveloperResumePage = async () => {

  const resumeInfo = await fetchResume();
  const educations = await fetchEducationalQualifications();
  const experiences = await fetchWorkExperiences()
  const skills = await fetchSkills();
  const references = await fetchMyReferences();
  const projects = await fetchMyProjects();
  const certificates = await fetchMyCertificates();
  const devSkills = await fetchMyDevSkills();
  const currentUserInfo = await fetchCurrentUser()
  const setting = await fetchSetting();

  const session = await getServerSession(authOptions);

  if(!session) {
    return redirect('/auth/login');
  }


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
          devSkills={devSkills}
          setting={setting}
        />

    </>
  )
}

export default MyDeveloperResumePage
