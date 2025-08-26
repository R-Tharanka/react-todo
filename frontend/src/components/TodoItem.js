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
    <li className="bg-gradient-to-r from-primary-purple to-secondary-purple rounded-lg shadow-md p-4 flex items-center transition-all hover:shadow-lg">
      <div 
        className={`h-6 w-6 flex items-center justify-center rounded mr-3 cursor-pointer transition-colors ${
          task.completed 
            ? 'bg-white' 
            : 'border-2 border-white'
        }`}
        onClick={() => toggleComplete(task._id)}
        role="checkbox"
        aria-checked={task.completed}
        tabIndex={0}
      >
        {task.completed && <FaCheck className="text-primary-purple text-sm" />}
      </div>

      {isEditing ? (
        <input
          type="text"
          className="flex-grow text-white bg-opacity-20 bg-white px-3 py-1 rounded border-none focus:ring-2 focus:ring-white focus:outline-none"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          autoFocus
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
        />
      ) : (
        <p className={`flex-grow text-white ${
          task.completed ? 'line-through opacity-70' : ''
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
              className="text-white hover:text-gray-200 p-1 transition-colors"
            >
              <FaSave />
            </button>
            <button 
              onClick={handleCancel} 
              aria-label="Cancel"
              className="text-white hover:text-gray-200 p-1 transition-colors"
            >
              <FaTimes />
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={handleEdit} 
              aria-label="Edit"
              className="text-white hover:text-gray-200 p-1 transition-colors"
            >
              <FaEdit />
            </button>
            <button 
              onClick={() => deleteTask(task._id)} 
              aria-label="Delete"
              className="text-white hover:text-gray-200 p-1 transition-colors"
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
