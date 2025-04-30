import { fetchCurrentUser, fetchEducationalQualifications, fetchMyReferences, fetchResume, fetchSetting, fetchSkills, fetchWorkExperiences } from "@/app/actions/user-actions"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import MyResume from "@/app/components/resume-detail/MyResume";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const MyRegularResumePage = async () => {

  const session = await getServerSession(authOptions)

  const currentUserId = session?.user?.id;

  const resumeInfo = await fetchResume(currentUserId);
  const educations = await fetchEducationalQualifications(currentUserId);
  const experiences = await fetchWorkExperiences(currentUserId)
  const skills = await fetchSkills(currentUserId);
  const references = await fetchMyReferences(currentUserId);
  const currentUserInfo = await fetchCurrentUser()
  const setting = await fetchSetting(currentUserId);


  if(!session) {
    return redirect('/auth/login');
  }

  if (session?.user?.role !== 'USER') {
    return;
  }

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

export default MyRegularResumePage
