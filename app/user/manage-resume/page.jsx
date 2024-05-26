import { fetchMyCertificates, fetchMyProjects } from "@/app/actions/user-actions"
import ProjectManageTable from "@/app/components/tables/ProjectManageTable";
import { projectColumns, certificateColumns } from "@/app/columsData/columnsData";

const ManageResumeContent = async () => {

const projects = await fetchMyProjects();

const certificates = await fetchMyCertificates();


  return (
    <div>
        <h1 className="text-center font-extrabold mt-14 mb-2 py-6">Manage Resume</h1>


        <div className="container mx-auto py-4 my-4">
            {projects?.length > 0 && <ProjectManageTable columns={projectColumns} data={projects}  />} 
        </div>

        <div className="container mx-auto py-4 my-4">
            {certificates?.length > 0 && <ProjectManageTable columns={certificateColumns} data={certificates}  />} 
        </div>
    </div>
  )
}

export default ManageResumeContent