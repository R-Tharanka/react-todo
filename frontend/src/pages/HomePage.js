import React, { useContext, useEffect, useState } from 'react';
import TodoList from '../components/TodoList';
import SearchBox from '../components/SearchBox';
import FilterButtons from '../components/FilterButtons';
import Hero from '../components/Hero';
import { TodoContext } from '../context/TodoContext';
import { FaSpinner, FaClipboardList } from 'react-icons/fa';

const HomePage = () => {
  const { loading, error, tasks } = useContext(TodoContext);
  const [showScrollHint, setShowScrollHint] = useState(false);
  
  // Check if scroll hint should be shown
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
      <div className="max-w-4xl mx-auto bg-white dark:bg-card-bg rounded-xl shadow-xl p-4 sm:p-6 md:p-8">
        <div className="mb-4 sm:mb-6">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white flex items-center">
              <FaClipboardList className="mr-2 text-primary-purple" />
              Your Tasks
            </h2>
          </div>
          <SearchBox />
          <div className="mt-4">
            <FilterButtons />
          </div>
        </div>
        
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
          {loading ? (
            <div className="flex justify-center items-center my-16">
              <FaSpinner className="animate-spin h-8 w-8 text-primary-purple" />
            </div>
          ) : (
            <div 
              className="h-[33rem] sm:h-[34rem] md:h-[36rem] overflow-y-auto overflow-x-hidden px-2 custom-scrollbar task-container"
              id="task-scroll-container"
            >
              <TodoList />
              {showScrollHint && (
                <div className="text-center text-xs text-gray-500 dark:text-gray-400 py-2 opacity-70 scroll-hint animate-fadeIn">
                  {/* Subtle scrolling hint */}
                  Scroll to see more tasks
                </div>
              )}
            </div>
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
