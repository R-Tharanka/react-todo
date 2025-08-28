import React, { useContext } from 'react';
import { FaHeart, FaGithub, FaTasks, FaRocket } from 'react-icons/fa';
import { ThemeContext } from '../context/ThemeContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  
  // Get URLs from environment variables
  const githubUrl = process.env.REACT_APP_GITHUB_URL || 'https://github.com/R-Tharanka';
  const portfolioUrl = process.env.REACT_APP_PORTFOLIO_URL || 'https://ruchira-portfolio.vercel.app/';
  
  // Portfolio logo URLs based on theme
  const portfolioLogoLight = 'https://ruchira-portfolio.vercel.app/assets/logo_for_light.png';
  const portfolioLogoDark = 'https://ruchira-portfolio.vercel.app/assets/logo_for_dark.png';
  
  return (
    <footer className={`${
      isDark ? 'bg-dark-bg text-gray-300' : 'bg-white text-gray-700'
    } py-8 px-6 mt-8 transition-all duration-200 border-t ${
      isDark ? 'border-gray-700' : 'border-gray-200'
    } backdrop-blur-sm ${
      isDark ? 'bg-dark-bg/90' : 'bg-white/90'
    }`}>
      <div className="container mx-auto">
        {/* Tagline section */}
        <div className={`mb-6 pb-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center items-center mb-3">
              <div className="flex items-center">
                <FaTasks className="text-2xl text-primary-purple mr-2" />
                <span className="text-xl font-bold text-gray-800 dark:text-white">Task Manager</span>
              </div>
            </div>
            <p className={`flex items-center justify-center text-base ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              <FaRocket className="mr-2 text-primary-purple" />
              <span className="font-medium">Boost your productivity with our comprehensive task management solution</span>
            </p>
            <p className="text-sm opacity-80">
              Organize, prioritize, and accomplish your goals with style and efficiency.
            </p>
          </div>
        </div>
        
        {/* Footer main content */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm flex items-center">
              &copy; {currentYear} Task Manager. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center">
            <p className="text-sm mr-3 flex items-center">
              Made by R-Tharanka
            </p>
            <div className="flex items-center">
              <div className="group relative flex items-center mx-1">
                <a 
                  href={portfolioUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`${
                    isDark ? 'text-gray-300 hover:text-primary-purple' : 'text-gray-600 hover:text-primary-purple'
                  } transition-all duration-300 p-2 rounded-full hover:bg-opacity-15 hover:bg-primary-purple flex items-center justify-center hover:shadow-md hover:shadow-primary-purple/20 hover:-translate-y-1`}
                  aria-label="Portfolio"
                >
                  <img 
                    src={isDark ? portfolioLogoDark : portfolioLogoLight} 
                    alt="Portfolio Logo" 
                    className="w-5 h-5 object-contain transform group-hover:scale-110 transition-transform duration-300" 
                  />
                </a>
                <span className={`absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs font-medium ${
                  isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'
                } rounded shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none border ${
                  isDark ? 'border-gray-600' : 'border-gray-200'
                } scale-90 group-hover:scale-100`}>
                  Visit Portfolio
                </span>
              </div>
              <div className="group relative flex items-center mx-1">
                <a 
                  href={githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`${
                    isDark ? 'text-gray-300 hover:text-primary-purple' : 'text-gray-600 hover:text-primary-purple'
                  } transition-all duration-300 p-2 rounded-full hover:bg-opacity-15 hover:bg-primary-purple flex items-center justify-center hover:shadow-md hover:shadow-primary-purple/20 hover:-translate-y-1`}
                  aria-label="GitHub"
                >
                  <FaGithub className="text-xl transform group-hover:scale-110 transition-transform duration-300" />
                </a>
                <span className={`absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs font-medium ${
                  isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'
                } rounded shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none border ${
                  isDark ? 'border-gray-600' : 'border-gray-200'
                } scale-90 group-hover:scale-100`}>
                  GitHub Profile
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
