import React, { useState, useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import { FaEdit, FaTrash, FaCheck, FaTimes, FaSave } from 'react-icons/fa';

const TodoItem = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const { toggleComplete, updateTask, deleteTask } = useContext(TodoContext);

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(task.text);
  };

  const handleSave = () => {
    if (editText.trim() !== '') {
      updateTask(task._id, editText);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditText(task.text);
  };

  return (
    <li className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-4 flex items-center transition-all hover:shadow-md group relative">
      <div 
        className={`h-6 w-6 flex items-center justify-center rounded-full mr-3 cursor-pointer transition-colors ${
          task.completed 
            ? 'bg-primary-purple border-2 border-primary-purple' 
            : 'border-2 border-gray-300 dark:border-gray-600 hover:border-primary-purple dark:hover:border-primary-purple'
        }`}
        onClick={() => toggleComplete(task._id)}
        role="checkbox"
        aria-checked={task.completed}
        tabIndex={0}
      >
        {task.completed && <FaCheck className="text-white text-sm" />}
      </div>

      {isEditing ? (
        <input
          type="text"
          className="flex-grow bg-white dark:bg-gray-800 text-gray-800 dark:text-white px-3 py-1 rounded border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-purple focus:border-transparent focus:outline-none"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          autoFocus
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
        />
      ) : (
        <p className={`flex-grow text-gray-800 dark:text-white ${
          task.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''
        }`}>
          {task.text}
        </p>
      )}

      <div className="flex space-x-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {isEditing ? (
          <>
            <button 
              onClick={handleSave} 
              aria-label="Save"
              className="p-2 rounded-full hover:bg-green-100 dark:hover:bg-green-900 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              <FaSave />
            </button>
            <button 
              onClick={handleCancel} 
              aria-label="Cancel"
              className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            >
              <FaTimes />
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={handleEdit} 
              aria-label="Edit"
              className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <FaEdit />
            </button>
            <button 
              onClick={() => deleteTask(task._id)} 
              aria-label="Delete"
              className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            >
              <FaTrash />
            </button>
          </>
        )}
      </div>
    </li>
  );
};

export default TodoItem;
