import React, { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import { AuthContext } from '../context/AuthContext';
import { FaSearch } from 'react-icons/fa';
import SortButton from './SortButton';

const SearchBox = () => {
  const { searchTerm, setSearchTerm } = useContext(TodoContext);
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search tasks..."
              disabled
              aria-label="Search tasks"
              className="w-full px-4 py-3 pl-10 rounded-lg bg-gray-100 dark:bg-opacity-20 dark:bg-black text-gray-800 dark:text-white opacity-60 cursor-not-allowed"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
          </div>
          <SortButton />
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search tasks"
            className="w-full px-4 py-3 pl-10 rounded-lg bg-gray-100 dark:bg-opacity-20 dark:bg-black text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-purple"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
        </div>
        <SortButton />
      </div>
    </div>
  );
};

export default SearchBox;
