import React, { useState, useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import { AuthContext } from '../context/AuthContext';
import { FaPlus, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const TodoForm = () => {
  const [inputText, setInputText] = useState('');
  const { addTask, error } = useContext(TodoContext);
  const { user } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() && user) {
      addTask(inputText);
      setInputText('');
    }
  };

  if (!user) {
    return (
      <div className="mt-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
        <FaLock className="mx-auto text-4xl mb-3 text-primary-purple opacity-70" />
        <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">Login to Add Tasks</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">You need to be logged in to add and manage your tasks.</p>
        <div className="flex justify-center space-x-4">
          <Link to="/login" className="px-6 py-2 bg-primary-purple hover:bg-primary-hover text-white rounded-lg transition-colors">
            Login
          </Link>
          <Link to="/register" className="px-6 py-2 border border-primary-purple text-primary-purple dark:text-white hover:bg-primary-purple hover:text-white rounded-lg transition-colors">
            Register
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form className="mt-6 flex" onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="What is the task today?"
        aria-label="Add a new task"
        className="flex-grow px-4 py-3 rounded-l-lg border-0 bg-gray-100 dark:bg-dark-card text-gray-800 dark:text-white focus:ring-2 focus:ring-primary-purple focus:outline-none shadow-inner"
      />
      <button 
        type="submit" 
        aria-label="Add task"
        className="btn-add-task px-6 py-3 rounded-r-lg flex items-center justify-center bg-primary-purple hover:bg-primary-hover text-white"
      >
        Add Task <FaPlus className="ml-2" />
      </button>
    </form>
  );
};

export default TodoForm;
