import { fetchCurrentUser, fetchEducationalQualifications, fetchMyReferences, fetchResume, fetchSetting, fetchSkills, fetchWorkExperiences } from "@/app/actions/user-actions"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import MyResume from "@/app/components/resume-detail/MyResume";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const MyRegularResumePage = async () => {

  const resumeInfo = await fetchResume();
  const educations = await fetchEducationalQualifications();
  const experiences = await fetchWorkExperiences()
  const skills = await fetchSkills();
  const references = await fetchMyReferences();
  const currentUserInfo = await fetchCurrentUser()
  const setting = await fetchSetting();

  const session = await getServerSession(authOptions);

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
