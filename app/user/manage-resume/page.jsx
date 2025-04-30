import { fetchEducationalQualifications, fetchMyCertificates, fetchMyDevSkills, fetchMyProjects, fetchMyReferences, fetchSkills, fetchWorkExperiences } from "@/app/actions/user-actions"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CertificateManageTable from "@/app/components/tables/CertificateManageTable";
import DevSkillManageTable from "@/app/components/tables/DevSkillManageTable";
import EducationManageTable from "@/app/components/tables/EducationManageTable";
import ProjectManageTable from "@/app/components/tables/ProjectManageTable";
import ReferenceManageTable from "@/app/components/tables/ReferenceManageTable";
import SkillsManageTable from "@/app/components/tables/SkillsManageTable";
import WorkExperienceManageTable from "@/app/components/tables/WorkExperienceManageTable";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const ManageResumeContent = async () => {

const session = await getServerSession(authOptions);

const currentUserId = session?.user?.id

if(!session) {
    return redirect('/auth/login')
}

const projects = await fetchMyProjects(currentUserId);

const certificates = await fetchMyCertificates(currentUserId);

const experiences = await fetchWorkExperiences(currentUserId);

const educations = await fetchEducationalQualifications(currentUserId);

const references = await fetchMyReferences(currentUserId);

const devSkills = await fetchMyDevSkills(currentUserId)

const skills = await fetchSkills(currentUserId);


  return (
    <div className="dark:bg-gray-900">
        <h1 className="text-center font-extrabold mt-14 mb-2 py-6">Manage Resume</h1>

        <div className="container mx-auto py-4 my-4">
            {projects?.length > 0 && <ProjectManageTable projects={projects}   />} 
        </div>

        <div className="container mx-auto py-4 my-4">
            {certificates?.length > 0 && <CertificateManageTable certificates={certificates}   />} 
        </div>

        <div className="container mx-auto py-4 my-4">
            {experiences?.length > 0 && <WorkExperienceManageTable experiences={experiences}   />} 
        </div>

        <div className="container mx-auto py-4 my-4">
            {educations?.length > 0 && <EducationManageTable educations={educations}   />} 
        </div>

        <div className="container mx-auto py-4 my-4">
            {references?.length > 0 && <ReferenceManageTable references={references}   />} 
        </div>

        <div className="container mx-auto py-4 my-4">
            {devSkills?.length > 0 && <DevSkillManageTable devSkills={devSkills}   />} 
        </div>

        <div className="container mx-auto py-4 my-4">
            {skills?.length > 0 && <SkillsManageTable skills={skills}   />} 
        </div>

    </div>
  )
}

export default ManageResumeContent