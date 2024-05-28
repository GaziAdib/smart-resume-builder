import { fetchEducationalQualifications, fetchMyCertificates, fetchMyProjects, fetchMyReferences, fetchSkills, fetchWorkExperiences } from "@/app/actions/user-actions"
import CertificateManageTable from "@/app/components/tables/CertificateManageTable";
import EducationManageTable from "@/app/components/tables/EducationManageTable";
import ProjectManageTable from "@/app/components/tables/ProjectManageTable";
import ReferenceManageTable from "@/app/components/tables/ReferenceManageTable";
import WorkExperienceManageTable from "@/app/components/tables/WorkExperienceManageTable";

const ManageResumeContent = async () => {

const projects = await fetchMyProjects();

const certificates = await fetchMyCertificates();

const experiences = await fetchWorkExperiences();

const educations = await fetchEducationalQualifications();

const references = await fetchMyReferences();

const skills = await fetchSkills();


  return (
    <div>
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

    </div>
  )
}

export default ManageResumeContent