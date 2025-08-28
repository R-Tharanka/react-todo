import React, { useState, useContext, useRef, useEffect } from 'react';
import { TodoContext } from '../context/TodoContext';
import { FaEdit, FaTrash, FaCheck, FaTimes, FaSave, FaCalendarAlt, FaFlag, FaTag } from 'react-icons/fa';
import DatePicker from './DatePicker';
import PrioritySelect from './PrioritySelect';

/**
 * TodoItem Component - Renders an individual task with editing capabilities,
 * completion status toggle, and detailed task information.
 */

// Formats a date string to a user-friendly format (Today, Tomorrow, Yesterday, or short date)
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

// Checks if a task is overdue (due date is in the past and task is not completed)
const isOverdue = (task) => {
  if (!task.dueDate || task.completed) return false;
  const dueDate = new Date(task.dueDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  dueDate.setHours(0, 0, 0, 0);
  return dueDate < today;
};

// Checks if a task is due today
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

// Returns the color class for the priority dot indicator
const getPriorityColor = (priority) => {
  switch(priority) {
    case 3: return 'bg-red-500';
    case 2: return 'bg-yellow-500';
    case 1: return 'bg-blue-500';
    default: return 'bg-gray-400';
  }
};

const TodoItem = ({ task, selectMode = false, isSelected = false }) => {
  console.log(`Rendering TodoItem for task ${task._id}, selectMode: ${selectMode}, isSelected: ${isSelected}`);
  // State for tracking editing mode and task properties
  const [isEditing, setIsEditing] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [editDueDate, setEditDueDate] = useState(task.dueDate || null);
  const [editPriority, setEditPriority] = useState(typeof task.priority !== 'undefined' ? task.priority : 0);
  const [editCategory, setEditCategory] = useState(task.category || '');
  
  // Get task management functions from context
  const { toggleComplete, updateTask, deleteTask } = useContext(TodoContext);
  
  // Reference for modal to handle outside clicks
  const modalRef = useRef(null);

  // Close modal when clicking outside of it
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

  // Enable editing mode and initialize all form fields
  const handleEdit = () => {
    setIsEditing(true);
    setEditText(task.text);
    setEditDueDate(task.dueDate || null);
    setEditPriority(typeof task.priority !== 'undefined' ? task.priority : 0);
    setEditCategory(task.category || '');
  };
  
  // Open details modal for metadata editing
  const openDetailsModal = () => {
    setShowDetailsModal(true);
    setEditDueDate(task.dueDate || null);
    setEditPriority(typeof task.priority !== 'undefined' ? task.priority : 0);
    setEditCategory(task.category || '');
  };

  // Save task changes (text and metadata)
  const handleSave = () => {
    if (editText.trim() !== '') {
      updateTask(task._id, editText, editDueDate, editPriority, editCategory);
      setIsEditing(false);
    }
  };

  // Cancel editing and reset all form fields
  const handleCancel = () => {
    setIsEditing(false);
    setEditText(task.text);
    setEditDueDate(task.dueDate || null);
    setEditPriority(typeof task.priority !== 'undefined' ? task.priority : 0);
    setEditCategory(task.category || '');
  };

  return (
    <li className={`bg-primary-purple dark:bg-purple-800 border-2 border-purple-300 dark:border-purple-700 rounded-lg shadow-sm p-4 flex items-start sm:items-center transition-all hover:shadow-lg hover:translate-y-[-1px] hover:border-white dark:hover:border-white transform duration-200 ease-in-out group relative ${
      selectMode ? 'pl-14' : ''
    } ${
      isSelected ? 'ring-2 ring-white bg-purple-700 dark:bg-purple-700' : ''
    }`}>
      {/* Task completion checkbox */}
      <div className="flex flex-col items-center mr-3">
        <div 
          className={`h-6 w-6 flex-shrink-0 flex items-center justify-center rounded-full cursor-pointer transition-colors mt-0.5 sm:mt-0 ${
            task.completed 
              ? 'bg-green-500 border-2 border-green-500' 
              : 'border-2 border-white hover:border-green-300 dark:border-purple-300 dark:hover:border-green-300'
          }`}
          onClick={() => toggleComplete(task._id)}
          role="checkbox"
          aria-checked={task.completed}
          tabIndex={0}
        >
          {task.completed && <FaCheck className="text-white text-sm" />}
        </div>
        <span className="text-[10px] font-medium mt-1 bg-white/20 dark:bg-white/20 text-white dark:text-white px-1.5 py-0.5 rounded-sm">Done</span>
      </div>

      {/* Task editing form or display */}
      {isEditing ? (
        <div className="flex-grow flex flex-col space-y-3">
          <input
            type="text"
            className="w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white px-3 py-2 rounded border border-purple-300 dark:border-purple-600 focus:ring-2 focus:ring-white focus:border-transparent focus:outline-none"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            autoFocus
            placeholder="Task text"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Due Date</label>
              <DatePicker 
                selectedDate={editDueDate}
                onDateChange={setEditDueDate}
              />
            </div>
            
            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Priority</label>
              <PrioritySelect
                selectedPriority={editPriority}
                onPriorityChange={setEditPriority}
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Category</label>
              <div className="relative">
                <div className="absolute left-3 inset-y-0 flex items-center pointer-events-none">
                  <FaTag className="text-primary-purple dark:text-white" />
                </div>
                <select
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  className="w-full appearance-none bg-white/70 dark:bg-gray-800 rounded-lg py-2 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-primary-purple border border-transparent dark:border-gray-600 dark:text-white cursor-pointer"
                >
                  <option value="">No Category</option>
                  <option value="Work">Work</option>
                  <option value="Personal">Personal</option>
                  <option value="Health">Health</option>
                  <option value="Shopping">Shopping</option>
                </select>
                <div className="absolute right-3 top-2 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-500 dark:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-grow">
          <p 
            className={`text-white dark:text-white ${
              task.completed ? 'line-through text-purple-200 dark:text-purple-300' : ''
            } hover:text-purple-100 dark:hover:text-purple-100 transition-colors text-sm sm:text-base leading-tight sm:leading-normal line-clamp-2 sm:line-clamp-none`}
            tabIndex={0}
          >
            {task.text}
          </p>
          {/* Task metadata badges (due date, priority, category) */}
          <div className="mt-1 text-xs flex items-center flex-wrap gap-1.5 sm:gap-2">
            {/* Due date badge with conditional styling based on status */}
            {task.dueDate && (
              <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full transform transition-all duration-200 hover:scale-105 hover:shadow-sm text-[10px] sm:text-xs ${
                isOverdue(task) ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800' : 
                isToday(task) ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300 hover:bg-yellow-200 dark:hover:bg-yellow-800' : 
                'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800'
              }`}>
                <FaCalendarAlt className="inline mr-0.5 sm:mr-1 text-[8px] sm:text-xs" /> {formatDueDate(task.dueDate)}
              </span>
            )}
            {/* Priority badge with color dot indicator */}
            {task.priority > 0 && (
              <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 transform transition-all duration-200 hover:scale-105 hover:bg-purple-200 dark:hover:bg-purple-800 hover:shadow-sm flex items-center text-[10px] sm:text-xs">
                <span className={`inline-block w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full mr-0.5 sm:mr-1 ${getPriorityColor(task.priority)}`}></span>
                <FaFlag className="inline mx-0.5 sm:mx-1 text-[8px] sm:text-xs" /> {getPriorityLabel(task.priority)}
              </span>
            )}
            {/* Category badge */}
            {task.category && (
              <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 flex items-center transform transition-all duration-200 hover:scale-105 hover:bg-indigo-200 dark:hover:bg-indigo-800 hover:shadow-sm text-[10px] sm:text-xs">
                <FaTag className="mr-0.5 sm:mr-1" size={8} /> {task.category}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Action buttons - always visible on mobile, hover on desktop */}
      <div className="flex space-x-1 ml-1 sm:ml-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
        {isEditing ? (
          <>
            {/* Save button for editing mode */}
            <div className="relative group/tooltip">
              <button 
                onClick={handleSave} 
                aria-label="Save"
                className="p-1.5 sm:p-2 rounded-full hover:bg-green-400 dark:hover:bg-green-700 text-white dark:text-white hover:text-green-100 dark:hover:text-green-200 transition-colors"
              >
                <FaSave className="text-sm sm:text-base" />
              </button>
              {/* Tooltip - hidden on mobile */}
              <div className="hidden sm:block absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap">
                Save changes
              </div>
            </div>
            
            {/* Cancel button for editing mode */}
            <div className="relative group/tooltip">
              <button 
                onClick={handleCancel} 
                aria-label="Cancel"
                className="p-1.5 sm:p-2 rounded-full hover:bg-red-400 dark:hover:bg-red-700 text-white dark:text-white hover:text-red-100 dark:hover:text-red-200 transition-colors"
              >
                <FaTimes className="text-sm sm:text-base" />
              </button>
              {/* Tooltip - hidden on mobile */}
              <div className="hidden sm:block absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap">
                Cancel editing
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Edit button for all task properties */}
            <div className="relative group/tooltip">
              <button 
                onClick={handleEdit} 
                aria-label="Edit Task"
                className="p-1.5 sm:p-2 rounded-full hover:bg-blue-400 dark:hover:bg-blue-700 text-white dark:text-white hover:text-blue-100 dark:hover:text-blue-200 transition-colors"
              >
                <FaEdit className="text-sm sm:text-base" />
              </button>
              {/* Tooltip - hidden on mobile */}
              <div className="hidden sm:block absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap">
                Edit task
              </div>
            </div>
            
            {/* Delete button */}
            <div className="relative group/tooltip">
              <button 
                onClick={() => deleteTask(task._id)} 
                aria-label="Delete"
                className="p-1.5 sm:p-2 rounded-full hover:bg-red-400 dark:hover:bg-red-700 text-white dark:text-white hover:text-red-100 dark:hover:text-red-200 transition-colors"
              >
                <FaTrash className="text-sm sm:text-base" />
              </button>
              {/* Tooltip - hidden on mobile */}
              <div className="hidden sm:block absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap">
                Delete task
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* Task details modal for editing metadata */}
      {showDetailsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div ref={modalRef} className="bg-purple-100 dark:bg-purple-900 rounded-lg shadow-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-purple-900 dark:text-white mb-4">
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
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category
                </label>
                <div className="relative">
                  <div className="absolute left-3 inset-y-0 flex items-center pointer-events-none">
                    <FaTag className="text-primary-purple dark:text-white" />
                  </div>
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="w-full appearance-none bg-white/70 dark:bg-gray-800 rounded-lg py-3 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-primary-purple border border-transparent dark:border-gray-600 dark:text-white cursor-pointer"
                  >
                    <option value="">No Category</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Health">Health</option>
                    <option value="Shopping">Shopping</option>
                  </select>
                  <div className="absolute right-3 top-3 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-500 dark:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 bg-purple-200 dark:bg-purple-800 text-purple-900 dark:text-purple-100 rounded-md hover:bg-purple-300 dark:hover:bg-purple-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
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
