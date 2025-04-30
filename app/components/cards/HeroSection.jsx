"use client";
import { FaEnvelope, FaPhone, FaGlobe, FaLinkedin, FaGithub } from 'react-icons/fa';

const HeroSection = ({ profileImage, currentUserInfo }) => {
  const { username, phone, email, website, linkedin, github } = currentUserInfo || {};

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      {/* Profile Image - Always on top */}
      <div className="flex justify-center mb-6">
        <div className="w-32 h-32 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-md">
          <img
            className="w-full h-full object-cover"
            src={profileImage || 'https://avatars.githubusercontent.com/u/41202696?v=4'}
            alt={`${username || 'User'} profile`}
          />
        </div>
      </div>

      {/* Name */}
      <h1 className="text-xl md:text-2xl my-2 py-2 lg:text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
        {username}
      </h1>

      {/* Contact Info - Horizontal on desktop, vertical on mobile */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4 mb-6">
        {email && (
          <div className="flex items-center">
            <FaEnvelope className="text-gray-500 dark:text-gray-400 mr-2" />
            <a 
              href={`mailto:${email}`} 
              className="text-sm md:text-base text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              {email}
            </a>
          </div>
        )}

        {phone && (
          <>
            <span className="hidden md:inline text-gray-400">|</span>
            <div className="flex items-center">
              <FaPhone className="text-gray-500 dark:text-gray-400 mr-2" />
              <a 
                href={`tel:${phone}`} 
                className="text-sm md:text-base text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                {phone}
              </a>
            </div>
          </>
        )}

  {website && (
          <>
            <span className="hidden md:inline text-gray-400">|</span>
            <div className="flex items-center">
              <FaGlobe className="text-gray-500 dark:text-gray-400 mr-2" />
              <a 
                href={website.startsWith('http') ? website : `https://${website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm md:text-base text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Website
              </a>
            </div>
          </>
        )}

{github && (
          <>
            <span className="hidden md:inline text-gray-400">|</span>
            <div className="flex items-center">
              <FaGithub className="text-gray-500 dark:text-gray-400 mr-2" />
              <a 
                href={github} 
                className="text-sm md:text-base text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Github
              </a>
            </div>
          </>
        )}

      

      </div>

      {/* Social Links - Only icons */}
      <div className="flex justify-center space-x-4">
        {linkedin && (
          <a 
            href={linkedin} 
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-blue-700 dark:hover:text-blue-400"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="w-5 h-5" />
          </a>
        )}
        {github && (
          <a 
            href={github} 
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-400"
            aria-label="GitHub"
          >
            <FaGithub className="w-5 h-5" />
          </a>
        )}
      </div>
    </div>
  );
};

export default HeroSection;



