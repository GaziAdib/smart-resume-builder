import { getServerSession } from "next-auth";
import LogoutButton from "./ui/LogoutButton";
import { authOptions } from "./api/auth/[...nextauth]/route";

import { 
  FiArrowRight, 
  FiZap, 
  FiUser, 
  FiBarChart2, 
  FiEdit2,
  FiCheckCircle,
  FiLayers,
} from "react-icons/fi";
import VideoPlayerFeatureSection from "./components/VideoPlayerFeatureSection";


export default async function Home() {
  const session = await getServerSession(authOptions);

  const features = [
    {
      name: "AI-Powered Resume Builder",
      description: "Create professional resumes in minutes with our intelligent templates and content suggestions.",
      icon: FiEdit2,
    },
    {
      name: "Smart Bio Data",
      description: "Generate personalized professional bios tailored to your industry and experience level.",
      icon: FiUser,
    },
    {
      name: "ATS Optimization",
      description: "Ensure your resume passes through Applicant Tracking Systems with our optimization tools.",
      icon: FiBarChart2,
    },
    {
      name: "Custom Design Options",
      description: "Choose from multiple modern templates with customizable colors and layouts.",
      icon: FiLayers,
    },
    {
      name: "Real-Time Feedback",
      description: "Get instant suggestions to improve your resume's impact and readability.",
      icon: FiCheckCircle,
    },
    {
      name: "One-Click Apply",
      description: "Export your resume in multiple formats ready for job applications.",
      icon: FiZap,
    },
  ];


  
  const images = {
    dashboard: "https://pbs.twimg.com/media/GpPPbSQasAETDWP?format=png&name=900x900",
    resumeEditor: "https://pbs.twimg.com/media/GpPPbSQasAETDWP?format=png&name=900x900",
    bioGenerator: "https://pbs.twimg.com/media/GpPSikvaoAABxf3?format=png&name=900x900",
    atsAnalysis: "https://pbs.twimg.com/media/GpPT9HQbsAAZnTI?format=png&name=small"
  };

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6">
        <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">Resume Builder</div>
        <div className="flex items-center space-x-4">
          {session && <LogoutButton />}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-br from-indigo-100 via-purple-50 to-teal-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-600">
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0">
            <div className="mt-24 sm:mt-32 lg:mt-16">
              <a href="#" className="inline-flex space-x-6">
                <span className="rounded-full bg-indigo-600/10 px-3 py-1 text-sm font-semibold leading-6 text-indigo-600 dark:text-indigo-400 ring-1 ring-inset ring-indigo-600/10 dark:ring-indigo-400/20">
                  New features
                </span>
                <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600 dark:text-gray-300">
                  <span>Just launched v2.0</span>
                  <FiArrowRight className="h-5 w-5 text-gray-400 dark:text-gray-500" aria-hidden="true" />
                </span>
              </a>
            </div>
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              Build resumes that get you hired
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Our AI-powered tools help you create professional resumes and bios that stand out from the crowd.
              Perfectly tailored to your experience and optimized for success.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <button className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400">
                Get started
              </button>
              <a href="#" className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100">
                See examples <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mt-0 lg:mr-0 lg:max-w-none lg:flex-none xl:ml-32">
            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
              <div className="-m-2 rounded-xl bg-gray-900/5 dark:bg-white/5 p-2 ring-1 ring-inset ring-gray-900/10 dark:ring-white/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                <img
                  src={images.dashboard}
                  alt="App screenshot"
                  width={2432}
                  height={1442}
                  className="w-[64rem] rounded-md shadow-2xl ring-1 ring-gray-900/10 dark:ring-white/10"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-xl my-4 font-semibold leading-7 text-indigo-600 dark:text-indigo-400">Build Better Resumes</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Everything you need to land your dream job
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Our platform combines cutting-edge technology with professional design to help you create the perfect
            resume for any opportunity.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <feature.icon className="h-5 w-5 flex-none text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-400">
                  <p className="flex-auto">{feature.description}</p>
                  <p className="mt-6">
                    <a href="#" className="text-sm font-semibold leading-6 text-indigo-600 dark:text-indigo-400">
                      Learn more <span aria-hidden="true">→</span>
                    </a>
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Staggered UI Section */}
      <div className="mt-32 sm:mt-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Top Smart Features
            </h2>
            <div className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-indigo-50 dark:bg-gray-800 p-8 sm:p-10">
                <h3 className="text-lg font-semibold leading-6 text-indigo-600 dark:text-indigo-400">Smart Resume Builder</h3>
                <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
                  Our Smart Resume builder can build your desired in nice modern dark & light mode that enhances your resume awesomely. 
                </p>
                <div className="mt-6">
                  <img
                    src={images.resumeEditor}
                    alt="Resume editor"
                    width={500}
                    height={300}
                    className="rounded-lg"
                  />
                </div>
              </div>
              <div className="bg-purple-50 dark:bg-gray-800 p-8 sm:p-10">
                <h3 className="text-lg font-semibold leading-6 text-purple-600 dark:text-purple-400">Smart Settings Control</h3>
                <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
                  Personalized Setting Control for your Work, Educational, Personal Info So you can hide or unhide the sections.
                </p>
                <div className="mt-6">
                  <img
                    src={images.bioGenerator}
                    alt="Bio generator"
                    width={500}
                    height={300}
                    className="rounded-lg"
                  />
                </div>
              </div>
              <div className="bg-teal-50 dark:bg-gray-800 p-8 sm:p-10">
                <h3 className="text-lg font-semibold leading-6 text-teal-600 dark:text-teal-400">Complete Sections Data Management</h3>
                <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
                  Manage you Personal Data and Sections with your own customized Admin Panel.
                </p>
                <div className="mt-6">
                  <img
                    src={images.atsAnalysis}
                    alt="ATS analysis"
                    width={500}
                    height={300}
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
       
       <VideoPlayerFeatureSection />
        
      </div>

      {/* CTA Section */}
      <div className="relative isolate mt-32 overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-600 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
        <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Ready to transform your job search?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-indigo-100">
          Join thousands of professionals who've landed their dream jobs with our resume builder.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            Get started for free
          </button>
          <a href="#" className="text-sm font-semibold leading-6 text-white">
            Learn more <span aria-hidden="true">→</span>
          </a>
        </div>
        <svg
          viewBox="0 0 1024 1024"
          className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
          aria-hidden="true"
        >
          <circle cx={512} cy={512} r={512} fill="url(#gradient)" fillOpacity="0.7" />
          <defs>
            <radialGradient id="gradient">
              <stop stopColor="#4F46E5" />
              <stop offset={1} stopColor="#7C3AED" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* User Session Info (for development) */}
      {session && (
        <div className="fixed bottom-4 right-4 rounded-lg bg-gray-900/90 px-4 py-2 text-sm text-white dark:bg-white/10 dark:text-gray-200">
          <p>Logged in as: {session.user?.email}</p>
          <LogoutButton color={'white'} label={'Logout'} className="mt-1 text-xs" />
        </div>
      )}
    </div>
  );
}








