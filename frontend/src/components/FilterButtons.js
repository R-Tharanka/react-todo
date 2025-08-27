import React, { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import { AuthContext } from '../context/AuthContext';
import { FaCheckCircle, FaCircle, FaListUl } from 'react-icons/fa';

const FilterButtons = () => {
  const { filter, setFilter } = useContext(TodoContext);
  const { user } = useContext(AuthContext);

  const filterOptions = [
    { value: 'all', label: 'All', icon: <FaListUl /> },
    { value: 'active', label: 'Active', icon: <FaCircle className="text-sm" /> },
    { value: 'completed', label: 'Completed', icon: <FaCheckCircle /> },
  ];

  if (!user) {
    return (
      <div className="flex justify-center my-6">
        <div className="inline-flex p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              disabled
              className="flex items-center px-4 py-2 rounded-md transition-colors text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-60"
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
    <div className="flex justify-center my-6">
      <div className="inline-flex p-1 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-inner">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            className={`flex items-center px-4 py-2 rounded-md transition-colors ${
              filter === option.value 
                ? 'bg-white dark:bg-card-bg text-primary-purple shadow-sm' 
                : 'text-gray-700 dark:text-gray-300 hover:text-primary-purple dark:hover:text-primary-purple'
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
