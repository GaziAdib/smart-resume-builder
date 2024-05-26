import { fetchEducationalQualifications, fetchMyCertificates, fetchMyProjects, fetchMyReferences, fetchSkills, fetchWorkExperiences } from "@/app/actions/user-actions"
import CertificateManageTable from "@/app/components/tables/CertificateManageTable";
import ProjectManageTable from "@/app/components/tables/ProjectManageTable";

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

    </div>
  )
}

export default ManageResumeContent