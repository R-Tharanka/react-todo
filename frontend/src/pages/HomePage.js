import React, { useContext, useEffect, useState } from 'react';
import TodoList from '../components/TodoList';
import SearchBox from '../components/SearchBox';
import FilterButtons from '../components/FilterButtons';
import Hero from '../components/Hero';
import ProductivityTips from '../components/ProductivityTips';
import { TodoContext } from '../context/TodoContext';
import { useNotification } from '../context/NotificationContext';
import { FaSpinner, FaClipboardList, FaTrash, FaTimes } from 'react-icons/fa';

const HomePage = () => {
  const { loading, error, tasks, deleteCompletedTasks, deleteMultipleTasks } = useContext(TodoContext);
  const { success, info, error: showError } = useNotification();
  const [showScrollHint, setShowScrollHint] = useState(false);
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const [selectMode, setSelectMode] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState([]);
  
  // Check if scroll hint should be shown
  // Handle option to select multiple tasks
  const handleSelectMultiple = () => {
    console.log('handleSelectMultiple called');
    setSelectMode(true);
    setShowOptionsMenu(false);
    success('Selection Mode Activated! Click on the checkboxes on the left side to select tasks.');
    console.log('Select mode should now be:', true);
  };
  
  // Handle clearing completed tasks
  const handleClearCompleted = async (e) => {
    // If event is provided, prevent default behavior
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    console.log('Clearing completed tasks...');
    const completedTasksCount = tasks.filter(task => task.completed).length;
    console.log(`Found ${completedTasksCount} completed tasks to delete`);
    
    if (completedTasksCount === 0) {
      info('No completed tasks to delete');
    } else {
      try {
        await deleteCompletedTasks();
        success(`Deleted ${completedTasksCount} completed task${completedTasksCount > 1 ? 's' : ''}`);
      } catch (error) {
        console.error("Error in handleClearCompleted:", error);
        showError('Failed to delete completed tasks');
      }
    }
    
    setShowOptionsMenu(false);
  };
  
  // Handle bulk deletion of selected tasks
  const handleDeleteSelected = async () => {
    console.log('Delete selected tasks button clicked');
    console.log('Selected tasks IDs:', selectedTasks);
    
    if (selectedTasks.length > 0) {
      try {
        // Call the context function to delete multiple tasks
        await deleteMultipleTasks(selectedTasks);
        success(`Deleted ${selectedTasks.length} task${selectedTasks.length > 1 ? 's' : ''}`);
        setSelectedTasks([]);
        setSelectMode(false);
      } catch (error) {
        console.error("Error in handleDeleteSelected:", error);
        showError('Failed to delete selected tasks');
      }
    } else {
      info('No tasks selected for deletion');
    }
  };
  
  // Handle exiting select mode
  const handleCancelSelectMode = () => {
    setSelectMode(false);
    setSelectedTasks([]);
  };
  
  // Close options menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Add logging to debug click events
      console.log('Click detected:', event.target);
      console.log('Is .options-menu element?', !!event.target.closest('.options-menu'));
      
      if (showOptionsMenu && !event.target.closest('.options-menu')) {
        console.log('Closing menu due to outside click');
        setShowOptionsMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showOptionsMenu]);

  useEffect(() => {
    if (!loading && tasks?.length > 0) {
      const checkScrollNeeded = () => {
        const container = document.getElementById('task-scroll-container');
        if (container) {
          // Show hint only if content height is greater than container height
          setShowScrollHint(container.scrollHeight > container.clientHeight);
        }
      };
      
      // Initial check
      checkScrollNeeded();
      
      // Re-check when tasks change
      const observer = new MutationObserver(checkScrollNeeded);
      const container = document.getElementById('task-scroll-container');
      if (container) {
        observer.observe(container, { childList: true, subtree: true });
      }
      
      return () => {
        if (observer) {
          observer.disconnect();
        }
      };
    }
  }, [loading, tasks]);
  
  return (
    <div className="min-h-screen pt-16 pb-12 px-4 sm:px-6">
      <Hero />
      <div className="max-w-4xl mx-auto mb-16 bg-white dark:bg-card-bg rounded-xl shadow-xl p-4 sm:p-6 md:p-8">
        <div className="mb-4 sm:mb-6">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white flex items-center">
              <FaClipboardList className="mr-2 text-primary-purple" />
              Your Tasks
            </h2>
            <div className="relative">
              <button 
                onClick={() => setShowOptionsMenu(!showOptionsMenu)} 
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300 focus:outline-none options-menu"
                aria-label="More options"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>
              {showOptionsMenu && (
                <div className="absolute right-0 mt-1 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-10 options-menu">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent event from bubbling up
                        handleSelectMultiple();
                      }}
                      className={`w-full text-left px-4 py-2 text-sm ${selectMode 
                        ? 'bg-primary-purple text-white hover:bg-primary-purple/90' 
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                      } flex items-center`}
                      role="menuitem"
                      disabled={selectMode}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      {selectMode ? 'Selection Mode Active' : 'Select Multiple'}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent event from bubbling up
                        handleClearCompleted();
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                      role="menuitem"
                      disabled={tasks.filter(task => task.completed).length === 0}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Clear Completed
                      {tasks.filter(task => task.completed).length > 0 && (
                        <span className="ml-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-full px-2 py-0.5 text-xs">
                          {tasks.filter(task => task.completed).length}
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <SearchBox />
          <div className="mt-4">
            <FilterButtons />
          </div>
        </div>
        
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 relative">
          {loading ? (
            <div className="flex justify-center items-center my-16">
              <FaSpinner className="animate-spin h-8 w-8 text-primary-purple" />
            </div>
          ) : (
            <>
              {selectMode && (
                <div className="flex items-center justify-between bg-primary-purple/10 dark:bg-primary-purple/20 rounded-lg p-2 mb-3">
                  <span className="text-sm text-gray-700 dark:text-gray-200 ml-2">
                    {selectedTasks.length} {selectedTasks.length === 1 ? 'task' : 'tasks'} selected
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={handleDeleteSelected}
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded-md transition-colors flex items-center"
                      disabled={selectedTasks.length === 0}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                    <button
                      onClick={handleCancelSelectMode}
                      className="px-3 py-1 bg-gray-400 dark:bg-gray-600 hover:bg-gray-500 dark:hover:bg-gray-500 text-white text-sm rounded-md transition-colors flex items-center"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
              
              <div 
                className={`${selectMode ? 'max-h-[30rem] sm:max-h-[31rem] md:max-h-[33rem]' : 'max-h-[33rem] sm:max-h-[34rem] md:max-h-[36rem]'} min-h-[10rem] overflow-y-auto overflow-x-hidden px-2 custom-scrollbar task-container`}
                id="task-scroll-container"
              >
                <TodoList 
                  selectMode={selectMode}
                  selectedTasks={selectedTasks}
                  setSelectedTasks={setSelectedTasks}
                />
                {showScrollHint && (
                  <div className="text-center text-xs text-gray-500 dark:text-gray-400 py-2 opacity-70 scroll-hint animate-fadeIn">
                    {/* Subtle scrolling hint */}
                    Scroll to see more tasks
                  </div>
                )}
              </div>
            </>
          )}
          
          {error && (
            <div className="mt-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md">
              {error}
            </div>
          )}
        </div>
      </div>
      
      {/* Productivity Tips Section - Separate from task section */}
      <div className="max-w-4xl mx-auto mt-20 mb-4  p-4 sm:p-6 md:p-8">
        <ProductivityTips />
      </div>
    </div>
  );
};

export default HomePage;
