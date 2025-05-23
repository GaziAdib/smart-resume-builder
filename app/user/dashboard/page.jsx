import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

const UserDashboard = async () => {

  const session = await getServerSession(authOptions);

  
    if(!session) {
        return redirect('/auth/login')
    }

    


  return (
    <div className="min-h-screen px-4 my-12 py-14 bg-gradient-to-br from-gray-100 to-blue-200 dark:from-gray-900 dark:to-gray-800">
      <h1 className="text-center text-4xl font-bold text-gray-800 dark:text-white mb-12">
        All Resumes
      </h1>

      <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[
          { title: "Developer Resume", link: "developer" },
          { title: "Regular Resume", link: "regular" },
        ].map((resume, index) => (
          <Link
            href={`/user/resume/${resume.link}`}
            key={index}
            className="w-full border-2 decoration-dashed dark:border-gray-700 max-w-xs bg-white dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-xl transition transform hover:scale-105 hover:shadow-2xl duration-300"
          >
            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {resume?.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {session?.user?.username}'s Resume
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                | Complete Resume
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;




