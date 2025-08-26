import React, { useContext } from 'react';
import TodoList from '../components/TodoList';
import TodoForm from '../components/TodoForm';
import SearchBox from '../components/SearchBox';
import FilterButtons from '../components/FilterButtons';
import { TodoContext } from '../context/TodoContext';
import { FaSpinner } from 'react-icons/fa';

const HomePage = () => {
  const { loading, error } = useContext(TodoContext);
  
  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-2xl mx-auto bg-white dark:bg-card-bg rounded-xl shadow-xl p-6 md:p-8">
        <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary-purple to-secondary-purple mb-6">Get Things Done!</h1>
        <TodoForm />
        
        <div className="mt-8">
          <SearchBox />
          <FilterButtons />
        </div>
        
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
  );
};

export default HomePage;
