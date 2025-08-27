import React, { useState, useContext, useRef, useEffect } from 'react';
import { TodoContext } from '../context/TodoContext';
import { FaEdit, FaTrash, FaCheck, FaTimes, FaSave, FaCalendarAlt, FaFlag } from 'react-icons/fa';
import DatePicker from './DatePicker';
import PrioritySelect from './PrioritySelect';

// Helper functions for due date formatting and status checking
const formatDueDate = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
};

const isOverdue = (task) => {
  if (!task.dueDate || task.completed) return false;
  const dueDate = new Date(task.dueDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  dueDate.setHours(0, 0, 0, 0);
  return dueDate < today;
};

const isToday = (task) => {
  if (!task.dueDate) return false;
  const dueDate = new Date(task.dueDate);
  const today = new Date();
  return dueDate.toDateString() === today.toDateString();
};

const getPriorityLabel = (priority) => {
  switch(priority) {
    case 3: return 'High';
    case 2: return 'Medium';
    case 1: return 'Low';
    default: return '';
  }
};

const TodoItem = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [editDueDate, setEditDueDate] = useState(task.dueDate || null);
  const [editPriority, setEditPriority] = useState(task.priority || 0);
  const { toggleComplete, updateTask, deleteTask } = useContext(TodoContext);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowDetailsModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(task.text);
    setEditDueDate(task.dueDate || null);
    setEditPriority(task.priority || 0);
  };

  const handleSave = () => {
    if (editText.trim() !== '') {
      updateTask(task._id, editText, editDueDate, editPriority);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditText(task.text);
    setEditDueDate(task.dueDate || null);
    setEditPriority(task.priority || 0);
  };
  
  const openDetailsModal = (e) => {
    e.stopPropagation();
    setShowDetailsModal(true);
    setEditDueDate(task.dueDate || null);
    setEditPriority(task.priority || 0);
  };
  
  const saveDetails = () => {
    updateTask(task._id, task.text, editDueDate, editPriority);
    setShowDetailsModal(false);
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
        <div className="flex-grow flex flex-col">
          <input
            type="text"
            className="w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white px-3 py-1 rounded border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-purple focus:border-transparent focus:outline-none mb-2"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            autoFocus
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          />
        </div>
      ) : (
        <div className="flex-grow">
          <p className={`text-gray-800 dark:text-white ${
            task.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''
          }`}>
            {task.text}
          </p>
          {task.dueDate && (
            <div className="mt-1 text-xs flex items-center">
              <span className={`px-2 py-1 rounded-full ${
                isOverdue(task) ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' : 
                isToday(task) ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' : 
                'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
              }`}>
                {formatDueDate(task.dueDate)}
              </span>
              {task.priority > 0 && (
                <span className="ml-2 px-2 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                  {getPriorityLabel(task.priority)}
                </span>
              )}
            </div>
          )}
        </div>
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
              onClick={openDetailsModal}
              aria-label="Set due date & priority"
              className="p-2 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              <FaCalendarAlt />
            </button>
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
      
      {showDetailsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div ref={modalRef} className="bg-white dark:bg-card-bg rounded-lg shadow-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Task Details
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Due Date
                </label>
                <DatePicker 
                  selectedDate={editDueDate}
                  onDateChange={setEditDueDate}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Priority
                </label>
                <PrioritySelect
                  selectedPriority={editPriority}
                  onPriorityChange={setEditPriority}
                />
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={saveDetails}
                className="px-4 py-2 bg-primary-purple text-white rounded-md hover:bg-purple-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </li>
  );
};

export default TodoItem;
