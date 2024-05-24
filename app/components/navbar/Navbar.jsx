"use client";

import Link from 'next/link';
import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 w-full bg-white dark:bg-gray-900 bg-opacity-30 backdrop-blur-md shadow-lg z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-xl text-gray-900 font-bold dark:text-gray-200">SMART RESUME</Link>
          </div>
          <div className="hidden mt-2 sm:ml-6 sm:flex sm:space-x-8">
            <Link href="/" className="text-gray-800 dark:text-gray-200 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
            <Link href="/user/dashboard" className="text-gray-800 dark:text-gray-200 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
            <Link href="/user/resume/regular" className="text-gray-800 dark:text-gray-200 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium">Regular</Link>
            <Link href="/user/settings" className="text-gray-800 dark:text-gray-200 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">Settings</Link>
          </div>
          <div className="-mr-2 flex sm:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center px-3  my-1 bg-gray-300 dark:bg-gray-800 shadow-lg  rounded-md text-gray-800 hover:text-white  focus:outline-none focus:text-white"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6 dark:text-white" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/" className="text-gray-800 dark:text-gray-200 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium">Home</Link>
            <Link href="/user/dashboard" className="text-gray-800 dark:text-gray-200 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium">Dashboard</Link>
            <Link href="/user/resume/regular" className="text-gray-800 dark:text-gray-200 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium">Regular</Link>
            <Link href="/user/settings" className="text-gray-800 dark:text-gray-200 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium">Setting</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;