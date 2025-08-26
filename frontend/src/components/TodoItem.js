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
    <li className="bg-white dark:bg-card-bg rounded-lg shadow-sm p-4 flex items-center border-l-4 border-primary-purple transition-all hover:shadow-md">
      <div 
        className={`h-6 w-6 flex items-center justify-center rounded mr-3 cursor-pointer transition-colors ${
          task.completed 
            ? 'bg-primary-purple' 
            : 'border-2 border-gray-300 dark:border-gray-600'
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
          className="flex-grow bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded border-none focus:ring-2 focus:ring-primary-purple focus:outline-none"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          autoFocus
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
        />
      ) : (
        <p className={`flex-grow text-gray-800 dark:text-gray-200 ${
          task.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''
        }`}>
          {task.text}
        </p>
      )}

      <div className="flex space-x-2 ml-2">
        {isEditing ? (
          <>
            <button 
              onClick={handleSave} 
              aria-label="Save"
              className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 p-1"
            >
              <FaSave />
            </button>
            <button 
              onClick={handleCancel} 
              aria-label="Cancel"
              className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 p-1"
            >
              <FaTimes />
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={handleEdit} 
              aria-label="Edit"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 p-1"
            >
              <FaEdit />
            </button>
            <button 
              onClick={() => deleteTask(task._id)} 
              aria-label="Delete"
              className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 p-1"
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
