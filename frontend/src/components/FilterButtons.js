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
      <div className="overflow-x-auto pb-2 mb-2">
        <div className="flex space-x-2 min-w-max">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              disabled
              className="flex items-center px-6 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-60 whitespace-nowrap"
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
    <div className="overflow-x-auto pb-2 mb-2">
      <div className="flex space-x-2 min-w-max">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            className={`flex items-center px-6 py-3 rounded-lg transition-colors whitespace-nowrap ${
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
