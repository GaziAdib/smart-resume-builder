import { fetchCurrentUser, fetchEducationalQualifications, fetchMyCertificates, fetchMyDevSkills, fetchMyProjects, fetchMyReferences, fetchResume, fetchSetting, fetchSkills, fetchWorkExperiences } from "@/app/actions/user-actions"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import MyDeveloperResume from "@/app/components/resume-detail/MyDeveloperResume";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const MyDeveloperResumePage = async () => {

  const session = await getServerSession(authOptions);

  const currentUserId = session?.user?.id;

  const resumeInfo = await fetchResume(currentUserId);
  const educations = await fetchEducationalQualifications(currentUserId);
  const experiences = await fetchWorkExperiences(currentUserId)
  const skills = await fetchSkills(currentUserId);
  const references = await fetchMyReferences(currentUserId);
  const projects = await fetchMyProjects(currentUserId);
  const certificates = await fetchMyCertificates(currentUserId);
  const devSkills = await fetchMyDevSkills(currentUserId)
  const currentUserInfo = await fetchCurrentUser(currentUserId)
  const setting = await fetchSetting(currentUserId);

 
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
