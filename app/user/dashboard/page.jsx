import { fetchAllResumes } from "@/app/actions/user-actions"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Link from "next/link";

const UserDashboard = async () => {

  const resumes = await fetchAllResumes();

  const session = await getServerSession(authOptions);

  return (
    <div className="container mx-auto px-4 my-14 py-8">
    <h1 className="text-center text-bold text-3xl mb-8">All Resumes</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {resumes?.map((resume) => (
        <div
          key={resume.id}
          className="bg-white shadow-md rounded-md p-4 cursor-pointer hover:bg-gray-100 transition duration-300"
          
        >
          <Link href={`/user/resume/${resume?.id}`}>

            <h2 className="text-lg font-semibold mb-2">{resume.id}</h2>
            <p className="text-gray-600">{session?.user?.username}</p>
            <p className="text-gray-600">created at: 26, June, 2023</p>
         
          </Link>
          
        </div>
      ))}
    </div>
  </div>

  )
}

export default UserDashboard