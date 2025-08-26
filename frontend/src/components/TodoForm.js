import React, { useState, useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import { FaPlus } from 'react-icons/fa';

const TodoForm = () => {
  const [inputText, setInputText] = useState('');
  const { addTask, error } = useContext(TodoContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      addTask(inputText);
      setInputText('');
    }
  };

  return (
    <form className="mt-6 flex" onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="What is the task today?"
        aria-label="Add a new task"
        className="flex-grow px-4 py-3 rounded-l-lg border-0 bg-white dark:bg-card-bg text-gray-800 dark:text-white focus:ring-2 focus:ring-primary-purple focus:outline-none"
      />
      <button 
        type="submit" 
        aria-label="Add task"
        className="bg-primary-purple text-white px-6 py-3 rounded-r-lg flex items-center justify-center hover:bg-opacity-90 transition-colors"
      >
        Add Task <FaPlus className="ml-2" />
      </button>
    </form>
  );
};

export default TodoForm;
