import { fetchEducationalPublicQualifications, fetchMyPublicCertificates, fetchMyPublicDevSkills, fetchMyPublicProjects, fetchMyPublicReferences, fetchPublicResume, fetchPublicSetting, fetchPublicSkills, fetchPublicWorkExperiences, verifyUserId } from "@/app/actions/public-actions";

import MyDeveloperResume from "@/app/components/resume-detail/MyDeveloperResume";

const ShareResume = async ({ params }) => {

    const userId = params?.userId || '';
 
    const user = await verifyUserId(userId);

    const resumeInfo = await fetchPublicResume(userId)
    const educations = await fetchEducationalPublicQualifications(userId);
    const experiences = await fetchPublicWorkExperiences(userId)
    const skills = await fetchPublicSkills(userId);
    const references = await fetchMyPublicReferences(userId);
    const projects = await fetchMyPublicProjects(userId);
    const certificates = await fetchMyPublicCertificates(userId);
    const devSkills = await fetchMyPublicDevSkills(userId);
    const setting = await fetchPublicSetting(userId);

   

   // If the user doesn't exist, show a message or handle it accordingly
  if (!user || !user.id) {
    return (
      <div className="my-14 py-10 items-center">
        <h1 className="text-3xl mt-5 p-5 text-red-600 font-extrabold text-center">User not found</h1>
      </div>
    );
  }

  return (
   
    <>
    <MyDeveloperResume
        currentUserInfo={user}
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
  );
}

export default ShareResume