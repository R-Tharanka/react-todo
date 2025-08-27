import React, { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import { AuthContext } from '../context/AuthContext';
import { FaListUl, FaCalendarDay, FaCalendarAlt, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';

const FilterButtons = () => {
  const { filter, setFilter } = useContext(TodoContext);
  const { user } = useContext(AuthContext);

  const filterOptions = [
    { value: 'all', label: 'All Tasks', icon: <FaListUl /> },
    { value: 'today', label: 'Today', icon: <FaCalendarDay /> },
    { value: 'upcoming', label: 'Upcoming', icon: <FaCalendarAlt /> },
    { value: 'overdue', label: 'Overdue', icon: <FaExclamationTriangle /> },
    { value: 'completed', label: 'Completed', icon: <FaCheckCircle /> },
  ];

  if (!user) {
    return (
      <div className="pb-2 mb-2">
        {/* Mobile view - Grid layout (non-authenticated) */}
        <div className="sm:hidden grid grid-cols-3 gap-2">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              disabled
              className="flex flex-col items-center justify-center px-2 py-3 rounded-lg opacity-60 cursor-not-allowed text-center bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500"
            >
              <span className="text-xl mb-1">{option.icon}</span>
              <span className="text-xs">{option.label}</span>
            </button>
          ))}
        </div>
        
        {/* Medium screens (non-authenticated) */}
        <div className="hidden sm:flex lg:hidden flex-wrap justify-center gap-1.5">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              disabled
              className="flex items-center px-3 py-2 rounded-lg opacity-60 cursor-not-allowed bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500"
            >
              <span className="mr-1.5">{option.icon}</span>
              <span className="text-sm">{option.label}</span>
            </button>
          ))}
        </div>
        
        {/* Large desktop view (non-authenticated) */}
        <div className="hidden lg:flex space-x-3">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              disabled
              className="flex items-center px-6 py-3 rounded-lg opacity-60 cursor-not-allowed bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500"
            >
              <span className="mr-2">{option.icon}</span>
              {option.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="pb-2 mb-2">
      {/* Mobile view - Grid layout */}
      <div className="sm:hidden grid grid-cols-3 gap-2">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            className={`flex flex-col items-center justify-center px-2 py-3 rounded-lg transition-colors text-center ${
              filter === option.value 
                ? 'bg-primary-purple text-white font-medium shadow-md' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
            onClick={() => setFilter(option.value)}
          >
            <span className="text-xl mb-1">{option.icon}</span>
            <span className="text-xs">{option.label}</span>
          </button>
        ))}
      </div>
      
      {/* Medium screens (tablets) - Compact layout */}
      <div className="hidden sm:flex lg:hidden flex-wrap justify-center gap-1.5">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
              filter === option.value 
                ? 'bg-primary-purple text-white font-medium' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
            onClick={() => setFilter(option.value)}
          >
            <span className="mr-1.5">{option.icon}</span>
            <span className="text-sm">{option.label}</span>
          </button>
        ))}
      </div>
      
      {/* Large desktop view */}
      <div className="hidden lg:flex space-x-3">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            className={`flex items-center px-6 py-3 rounded-lg transition-colors ${
              filter === option.value 
                ? 'bg-primary-purple text-white font-medium' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
            onClick={() => setFilter(option.value)}
          >
            <span className="mr-2">{option.icon}</span>
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterButtons;
