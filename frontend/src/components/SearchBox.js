import React, { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import { FaSearch } from 'react-icons/fa';

const SearchBox = () => {
  const { searchTerm, setSearchTerm } = useContext(TodoContext);

  return (
    <div className="search-box">
      <FaSearch />
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Search tasks"
      />
    </div>
  );
};

export default SearchBox;
