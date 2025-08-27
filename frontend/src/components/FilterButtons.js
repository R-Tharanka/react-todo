import React, { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import { AuthContext } from '../context/AuthContext';

const FilterButtons = () => {
  const { filter, setFilter } = useContext(TodoContext);
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="flex justify-center mt-8 mb-4 gap-2">
        <button
          className="px-4 py-2 rounded-md transition-colors bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-60"
          disabled
        >
          All
        </button>
        <button
          className="px-4 py-2 rounded-md transition-colors bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-60"
          disabled
        >
          Active
        </button>
        <button
          className="px-4 py-2 rounded-md transition-colors bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-60"
          disabled
        >
          Completed
        </button>
      </div>
    );
  }

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
