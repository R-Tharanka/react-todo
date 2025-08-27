import React, { useContext, useState, useRef, useEffect } from 'react';
import { TodoContext } from '../context/TodoContext';
import { AuthContext } from '../context/AuthContext';
import { FaSort, FaSortAmountDown, FaSortAlphaDown, FaSortNumericDown } from 'react-icons/fa';

const SortButton = () => {
  const { sortBy, setSortBy } = useContext(TodoContext);
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const sortOptions = [
    { value: 'newest', label: 'Newest First', icon: <FaSortAmountDown /> },
    { value: 'oldest', label: 'Oldest First', icon: <FaSortAmountDown className="transform rotate-180" /> },
    { value: 'priority', label: 'By Priority', icon: <FaSortNumericDown /> },
    { value: 'az', label: 'A-Z', icon: <FaSortAlphaDown /> }
  ];

  const handleSortChange = (option) => {
    setSortBy(option);
    setIsOpen(false);
  };

  if (!user) {
    return (
      <button 
        disabled
        className="flex items-center text-gray-400 dark:text-gray-600 px-3 py-2 rounded-md bg-gray-100 dark:bg-opacity-20 dark:bg-black opacity-60 cursor-not-allowed"
        aria-label="Sort tasks"
      >
        <FaSort className="mr-2" /> Sort
      </button>
    );
  }

  const currentSort = sortOptions.find(option => option.value === sortBy) || sortOptions[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-gray-700 dark:text-gray-300 hover:text-primary-purple dark:hover:text-primary-purple px-3 py-2 rounded-md bg-gray-100 dark:bg-opacity-20 dark:bg-black hover:bg-gray-200 dark:hover:bg-opacity-30 transition-colors"
        aria-label="Sort tasks"
        aria-expanded={isOpen}
      >
        {currentSort.icon}
        <span className="ml-2">{currentSort.label}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 z-10 w-48 bg-white dark:bg-card-bg rounded-md shadow-lg py-1 border border-gray-200 dark:border-gray-700">
          {sortOptions.map(option => (
            <button
              key={option.value}
              className={`flex items-center px-4 py-2 text-sm w-full text-left ${
                sortBy === option.value 
                  ? 'text-primary-purple bg-gray-100 dark:bg-gray-800' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              onClick={() => handleSortChange(option.value)}
            >
              <span className="w-5">{option.icon}</span>
              <span className="ml-2">{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortButton;
