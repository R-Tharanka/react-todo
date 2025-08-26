import React, { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';

const FilterButtons = () => {
  const { filter, setFilter } = useContext(TodoContext);

  return (
    <div className="flex justify-center mt-8 mb-4 gap-2">
      <button
        className={`px-4 py-2 rounded-md transition-colors ${
          filter === 'all' 
            ? 'bg-primary-purple text-white' 
            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
        }`}
        onClick={() => setFilter('all')}
      >
        All
      </button>
      <button
        className={`px-4 py-2 rounded-md transition-colors ${
          filter === 'active' 
            ? 'bg-primary-purple text-white' 
            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
        }`}
        onClick={() => setFilter('active')}
      >
        Active
      </button>
      <button
        className={`px-4 py-2 rounded-md transition-colors ${
          filter === 'completed' 
            ? 'bg-primary-purple text-white' 
            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
        }`}
        onClick={() => setFilter('completed')}
      >
        Completed
      </button>
    </div>
  );
};

export default FilterButtons;
