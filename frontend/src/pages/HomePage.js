import React, { useContext } from 'react';
import TodoList from '../components/TodoList';
import SearchBox from '../components/SearchBox';
import FilterButtons from '../components/FilterButtons';
import Hero from '../components/Hero';
import { TodoContext } from '../context/TodoContext';
import { FaSpinner, FaTasks } from 'react-icons/fa';

const HomePage = () => {
  const { loading, error } = useContext(TodoContext);
  
  return (
    <div className="min-h-screen pt-16 pb-12">
      <Hero />
      <div className="max-w-2xl mx-auto bg-white dark:bg-card-bg rounded-xl shadow-xl p-6 md:p-8 mx-4">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <FaTasks className="mr-2 text-primary-purple" />
            Task Manager
          </h2>
          <SearchBox />
          <FilterButtons />
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
          {loading ? (
            <div className="flex justify-center items-center my-16">
              <FaSpinner className="animate-spin h-8 w-8 text-primary-purple" />
            </div>
          ) : (
            <TodoList />
          )}
          
          {error && (
            <div className="mt-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
