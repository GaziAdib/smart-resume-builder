"use client";

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { FiSun, FiMoon, FiMenu, FiX, FiUser, FiBriefcase, FiHome, FiSettings, FiShare2, FiFileText, FiCode, FiLogOut } from 'react-icons/fi';

const Navbar = () => {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const pathname = usePathname();

  const hiddenRoutes = [
    `/user/share-resume/verify/${session?.user?.id}`
  ];

  // Check for dark mode preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isDark = localStorage.getItem('darkMode') === 'true' || 
                    (!('darkMode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
      setDarkMode(isDark);
      document.documentElement.classList.toggle('dark', isDark);
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));
    document.documentElement.classList.toggle('dark', newMode);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/auth/login' });
  };

  // if (hiddenRoutes.includes(pathname)) return null;

  // Navigation items
  const navItems = [
    { href: "/user/add-resume", name: "Add Resume", icon: <FiFileText className="mr-2" /> },
    { href: "/user/manage-resume", name: "Manage", icon: <FiBriefcase className="mr-2" /> },
    { href: "/user/dashboard", name: "Dashboard", icon: <FiUser className="mr-2" /> },
    { href: "/user/resume/regular", name: "Regular", icon: <FiFileText className="mr-2" /> },
    { href: "/user/resume/developer", name: "Developer", icon: <FiCode className="mr-2" /> },
    { href: "/user/settings", name: "Settings", icon: <FiSettings className="mr-2" /> },
  ];

  if (session?.user?.id) {
    navItems.push({
      href: `/user/share-resume/verify/${session.user.id}`,
      name: "Share",
      icon: <FiShare2 className="mr-2" />
    });
  }

  if (!session) {
    navItems.push({
      href: "/auth/login",
      name: "Login",
      icon: <FiUser className="mr-2" />
    });
  }

  return (
    <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 shadow-sm z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
                SMART RESUME
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems?.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors duration-200 ${
                  pathname === item.href
                    ? 'bg-blue-100 text-blue-700 dark:bg-gray-700 dark:text-blue-400'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}

            {/* Logout Button (visible when logged in) */}
            {session && (
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-md text-sm font-medium flex items-center text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
              >
                <FiLogOut className="mr-2" />
                Logout
              </button>
            )}

            {/* Dark/Light Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="ml-2 p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>

            {/* User Avatar if logged in */}
            {session?.user?.image && (
              <div className="ml-2 flex items-center">
                <img
                  src={session?.user?.image}
                  alt="User profile"
                  className="h-8 w-8 rounded-full object-cover border-2 border-blue-500 dark:border-blue-400"
                />
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleDarkMode}
              className="mr-2 p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>

            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors duration-200"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-xl transition-all duration-300">
          <div className="px-2 pt-2 pb-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`px-3 py-3 rounded-md text-base font-medium flex items-center transition-colors duration-200 ${
                  pathname === item.href
                    ? 'bg-blue-100 text-blue-700 dark:bg-gray-700 dark:text-blue-400'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}

            {/* Logout Button in mobile menu (visible when logged in) */}
            {session && (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="w-full px-3 py-3 rounded-md text-base font-medium flex items-center text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
              >
                <FiLogOut className="mr-2" />
                Logout
              </button>
            )}

            {/* User info if logged in */}
            {session?.user && (
              <div className="px-3 py-3 flex items-center">
                {session.user.image && (
                  <img
                    src={session.user.image}
                    alt="User profile"
                    className="h-8 w-8 rounded-full object-cover mr-3 border-2 border-blue-500 dark:border-blue-400"
                  />
                )}
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{session?.user?.username}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{session?.user?.email}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;





// "use client";

// import { useSession } from 'next-auth/react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import React, { useState, useEffect } from 'react';
// import { FiSun, FiMoon, FiMenu, FiX, FiUser, FiBriefcase, FiHome, FiSettings, FiShare2, FiFileText, FiCode } from 'react-icons/fi';

// const Navbar = () => {
//   const { data: session, status } = useSession();
//   const [isOpen, setIsOpen] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);
//   const pathname = usePathname();

//   const hiddenRoutes = [
//     `/user/share-resume/verify/${session?.user?.id}`
//   ];

//   // Check for dark mode preference
//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const isDark = localStorage.getItem('darkMode') === 'true' || 
//                     (!('darkMode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
//       setDarkMode(isDark);
//       document.documentElement.classList.toggle('dark', isDark);
//     }
//   }, []);

//   const toggleDarkMode = () => {
//     const newMode = !darkMode;
//     setDarkMode(newMode);
//     localStorage.setItem('darkMode', String(newMode));
//     document.documentElement.classList.toggle('dark', newMode);
//   };

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   // if (hiddenRoutes.includes(pathname)) return null;

//   // Navigation items
//   const navItems = [
//     { href: "/", name: "Home", icon: <FiHome className="mr-2" /> },
//     { href: "/user/add-resume", name: "Add Resume", icon: <FiFileText className="mr-2" /> },
//     { href: "/user/manage-resume", name: "Manage", icon: <FiBriefcase className="mr-2" /> },
//     { href: "/user/dashboard", name: "Dashboard", icon: <FiUser className="mr-2" /> },
//     { href: "/user/resume/regular", name: "Regular", icon: <FiFileText className="mr-2" /> },
//     { href: "/user/resume/developer", name: "Developer", icon: <FiCode className="mr-2" /> },
//     { href: "/user/settings", name: "Settings", icon: <FiSettings className="mr-2" /> },
//   ];

//   if (session?.user?.id) {
//     navItems.push({
//       href: `/user/share-resume/verify/${session.user.id}`,
//       name: "Share",
//       icon: <FiShare2 className="mr-2" />
//     });
//   }

//   if (!session) {
//     navItems.push({
//       href: "/auth/login",
//       name: "Login",
//       icon: <FiUser className="mr-2" />
//     });
//   }

//   return (
//     <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 shadow-sm z-50 transition-colors duration-300">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16 items-center">
//           {/* Logo */}
//           <div className="flex-shrink-0 flex items-center">
//             <Link href="/" className="flex items-center">
//               <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
//                 SMART RESUME
//               </span>
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-1">
//             {navItems?.map((item) => (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 className={`px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors duration-200 ${
//                   pathname === item.href
//                     ? 'bg-blue-100 text-blue-700 dark:bg-gray-700 dark:text-blue-400'
//                     : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
//                 }`}
//               >
//                 {item.icon}
//                 {item.name}
//               </Link>
//             ))}

//             {/* Dark/Light Mode Toggle */}
//             <button
//               onClick={toggleDarkMode}
//               className="ml-2 p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors duration-200"
//               aria-label="Toggle dark mode"
//             >
//               {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
//             </button>

//             {/* User Avatar if logged in */}
//             {session?.user?.image && (
//               <div className="ml-2 flex items-center">
//                 <img
//                   src={session?.user?.image}
//                   alt="User profile"
//                   className="h-8 w-8 rounded-full object-cover border-2 border-blue-500 dark:border-blue-400"
//                 />
//               </div>
//             )}
//           </div>

//           {/* Mobile menu button */}
//           <div className="flex md:hidden items-center">
//             <button
//               onClick={toggleDarkMode}
//               className="mr-2 p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors duration-200"
//               aria-label="Toggle dark mode"
//             >
//               {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
//             </button>

//             <button
//               onClick={toggleMenu}
//               type="button"
//               className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors duration-200"
//               aria-expanded="false"
//             >
//               <span className="sr-only">Open main menu</span>
//               {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Navigation */}
//       {isOpen && (
//         <div className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-xl transition-all duration-300">
//           <div className="px-2 pt-2 pb-4 space-y-1">
//             {navItems.map((item) => (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 onClick={() => setIsOpen(false)}
//                 className={`px-3 py-3 rounded-md text-base font-medium flex items-center transition-colors duration-200 ${
//                   pathname === item.href
//                     ? 'bg-blue-100 text-blue-700 dark:bg-gray-700 dark:text-blue-400'
//                     : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
//                 }`}
//               >
//                 {item.icon}
//                 {item.name}
//               </Link>
//             ))}

//             {/* User info if logged in */}
//             {session?.user && (
//               <div className="px-3 py-3 flex items-center">
//                 {session.user.image && (
//                   <img
//                     src={session.user.image}
//                     alt="User profile"
//                     className="h-8 w-8 rounded-full object-cover mr-3 border-2 border-blue-500 dark:border-blue-400"
//                   />
//                 )}
//                 <div>
//                   <p className="text-sm font-medium text-gray-900 dark:text-white">{session?.user?.username}</p>
//                   <p className="text-xs text-gray-500 dark:text-gray-400">{session?.user?.email}</p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;



























// "use client";

// import { useSession } from 'next-auth/react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import React, { useState } from 'react';

// const Navbar = () => {
//   const { data: session, status } = useSession(); 
//   const [isOpen, setIsOpen] = useState(false);
//   const pathname = usePathname();

//   const hiddenRoutes = [
//     `/user/share-resume/verify/${session?.user?.id}`
//   ];

//   if (hiddenRoutes.includes(pathname)) return null;

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <nav className="fixed top-0 w-full bg-white dark:bg-gray-900 bg-opacity-30 backdrop-blur-md shadow-lg z-10">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           <div className="flex-shrink-0 flex items-center">
//             <Link href="/" className="text-xl text-gray-900 font-bold dark:text-gray-200">SMART RESUME</Link>
//           </div>
//           <div className="hidden mt-2 sm:ml-6 sm:flex sm:space-x-8">
//             <Link href="/" className="text-gray-800 dark:text-gray-200 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
//             <Link href="/user/add-resume" className="text-gray-800 dark:text-gray-200 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">Add Resume</Link>
//             <Link href="/user/manage-resume" className="text-gray-800 dark:text-gray-200 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">Manage</Link>
//             <Link href="/user/dashboard" className="text-gray-800 dark:text-gray-200 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
//             <Link href="/user/resume/regular" className="text-gray-800 dark:text-gray-200 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">Regular</Link>
//             <Link href="/user/resume/developer" className="text-gray-800 dark:text-gray-200 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium">Developer</Link>
//             <Link href="/user/settings" className="text-gray-800 dark:text-gray-200 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">Settings</Link>

//             {session?.user?.id && (
//               <Link
//                 href={`/user/share-resume/verify/${session.user.id}`}
//                 className="text-gray-800 dark:text-gray-200 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
//               >
//                 Share
//               </Link>
//             )}

//             {!session && (
//               <Link
//                 href="/auth/login"
//                 className="text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium"
//               >
//                 Login
//               </Link>
//             )}
//           </div>

//           <div className="-mr-2 flex sm:hidden">
//             <button
//               onClick={toggleMenu}
//               type="button"
//               className="inline-flex items-center justify-center px-3 my-1 bg-gray-300 dark:bg-gray-800 shadow-lg rounded-md text-gray-800 hover:text-white focus:outline-none focus:text-white"
//             >
//               <span className="sr-only">Open main menu</span>
//               <svg className="h-6 w-6 dark:text-white" stroke="currentColor" fill="none" viewBox="0 0 24 24">
//                 {isOpen ? (
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                 ) : (
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//                 )}
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>

//       {isOpen && (
//         <div className="sm:hidden">
//           <div className="px-2 pt-2 pb-3 space-y-1">
//             <Link href="/" className="text-gray-800 dark:text-gray-200 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium">Home</Link>
//             <Link href="/user/dashboard" className="text-gray-800 dark:text-gray-200 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium">Dashboard</Link>
//             <Link href="/user/resume/regular" className="text-gray-800 dark:text-gray-200 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium">Regular</Link>
//             <Link href="/user/resume/developer" className="text-gray-800 dark:text-gray-200 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium">Developer</Link>
//             <Link href="/user/settings" className="text-gray-800 dark:text-gray-200 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium">Settings</Link>

//             {session?.user?.id && (
//               <Link
//                 href={`/user/share-resume/verify/${session.user.id}`}
//                 className="text-gray-800 dark:text-gray-200 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium"
//               >
//                 Share
//               </Link>
//             )}

//             {!session && (
//               <Link
//                 href="/auth/login"
//                 className="text-gray-800 dark:text-gray-200 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium"
//               >
//                 Login
//               </Link>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;









// "use client";

// import { useSession } from 'next-auth/react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import React, { useState } from 'react';

// const Navbar = () => {

//   const session = useSession();

//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   const pathname = usePathname();

//   console.log('pathname', pathname);

//   // Define the routes where the navbar should be hidden
//   const hiddenRoutes = [
//     '/user/share-resume/verify/6624ecda67980fbba06ce637'
//   ];

//   // Check if the current route is in the hiddenRoutes array
//   if (hiddenRoutes?.includes(pathname)) {
//     return null;
//   }


//     return (
//       <nav className={`fixed top-0 w-full bg-white dark:bg-gray-900 bg-opacity-30 backdrop-blur-md shadow-lg z-10`}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16">
//             <div className="flex-shrink-0 flex items-center">
//               <Link href="/" className="text-xl text-gray-900 font-bold dark:text-gray-200">SMART RESUME</Link>
//             </div>
//             <div className="hidden mt-2 sm:ml-6 sm:flex sm:space-x-8">
//               <Link href="/" className="text-gray-800 dark:text-gray-200 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
//               <Link href="/user/add-resume" className="text-gray-800 dark:text-gray-200 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">Add Resume</Link>
//               <Link href="/user/manage-resume" className="text-gray-800 dark:text-gray-200 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">Manage</Link>
//               <Link href="/user/dashboard" className="text-gray-800 dark:text-gray-200 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
//               <Link href="/user/resume/regular" className="text-gray-800 dark:text-gray-200 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium">Regular</Link>
//               <Link href="/user/settings" className="text-gray-800 dark:text-gray-200 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">Settings</Link>
//               <Link href={`/user/share-resume/verify/${session?.data?.user?.id}`} className="text-gray-800 dark:text-gray-200 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">Share</Link>
//               {!session && (
//                 <Link
//                   href="/auth/login"
//                   className="text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium"
//                 >
//                   Login
//                 </Link>
//               )}
//             </div>
//             <div className="-mr-2 flex sm:hidden">
//               <button
//                 onClick={toggleMenu}
//                 type="button"
//                 className="inline-flex items-center justify-center px-3  my-1 bg-gray-300 dark:bg-gray-800 shadow-lg  rounded-md text-gray-800 hover:text-white  focus:outline-none focus:text-white"
//               >
//                 <span className="sr-only">Open main menu</span>
//                 <svg className="h-6 w-6 dark:text-white" stroke="currentColor" fill="none" viewBox="0 0 24 24">
//                   {isOpen ? (
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                   ) : (
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//                   )}
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>
  
//         {isOpen && (
//           <div className="sm:hidden">
//             <div className="px-2 pt-2 pb-3 space-y-1">
//               <Link href="/" className="text-gray-800 dark:text-gray-200 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium">Home</Link>
//               <Link href="/user/dashboard" className="text-gray-800 dark:text-gray-200 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium">Dashboard</Link>
//               <Link href="/user/resume/regular" className="text-gray-800 dark:text-gray-200 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium">Regular</Link>
//               <Link href="/user/settings" className="text-gray-800 dark:text-gray-200 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium">Setting</Link>
//               <Link href={`/user/share-resume/verify/${session?.data?.user?.id}`} className="text-gray-800 dark:text-gray-200 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">Share</Link>
//               {!session && (
//                 <Link
//                   href="/auth/login"
//                   className="text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium"
//                 >
//                   Login
//                 </Link>
//               )}
//             </div>
//           </div>
//         )}
//       </nav>
//     );

  
// };

// export default Navbar;