import React, { useContext, useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TodoContext } from '../context/TodoContext';
import { AuthContext } from '../context/AuthContext';
import { FaCheckCircle, FaHourglassHalf, FaCalendar, FaFlag } from 'react-icons/fa';

const Hero = () => {
  const { tasks, addTask } = useContext(TodoContext);
  const { user } = useContext(AuthContext);
  const [newTaskText, setNewTaskText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');
  const taskInputRef = useRef(null);
  
  // Calculate task statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  
  // Handle click outside of the task input section
  useEffect(() => {
    function handleClickOutside(event) {
      if (taskInputRef.current && !taskInputRef.current.contains(event.target)) {
        // Only close if there's no text
        if (newTaskText.trim() === '') {
          setIsInputFocused(false);
        }
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [taskInputRef, newTaskText]);
  
  // Handle quick task creation
  const handleAddTask = () => {
    if (newTaskText.trim()) {
      const newTask = {
        text: newTaskText,
        completed: false,
        category: selectedCategory || 'Personal',
        priority: priority,
        dueDate: dueDate || null,
        date: new Date().toISOString()
      };
      addTask(newTask);
      setNewTaskText('');
      setSelectedCategory('');
      setDueDate('');
      setPriority('medium');
      setIsInputFocused(false);
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddTask();
    }
  };

  return (
    <div className="relative overflow-hidden mb-10 pb-20 pt-10">
      {/* Animated background orbs */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          className="absolute w-64 h-64 rounded-full bg-primary-purple opacity-20 blur-3xl"
          animate={{ 
            x: [0, 30, 0], 
            y: [0, 20, 0] 
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 8,
            ease: "easeInOut"
          }}
          style={{ top: '10%', left: '15%' }}
        />
        <motion.div 
          className="absolute w-80 h-80 rounded-full bg-secondary-purple opacity-20 blur-3xl"
          animate={{ 
            x: [0, -20, 0], 
            y: [0, 40, 0] 
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 10,
            ease: "easeInOut"
          }}
          style={{ top: '20%', right: '10%' }}
        />
        <motion.div 
          className="absolute w-72 h-72 rounded-full bg-primary-purple opacity-20 blur-3xl"
          animate={{ 
            x: [0, 30, 0], 
            y: [0, -30, 0] 
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 9,
            ease: "easeInOut"
          }}
          style={{ bottom: '5%', left: '30%' }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 pb-8">
        {/* Animated heading */}
        <motion.h1 
          className="text-5xl md:text-6xl font-bold text-white mb-6"
          style={{ lineHeight: 'normal', textShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)' }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Get Things Done!
        </motion.h1>
        
        {/* Animated subheading */}
        <motion.p 
          className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          Transform your productivity with our advanced task management
          system. Organize, prioritize, and accomplish your goals with ease.
        </motion.p>
        
        {/* Task summary for logged-in users */}
        {user && (
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <div className="bg-white/30 dark:bg-card-bg/30 backdrop-blur-md rounded-lg px-6 py-3 flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-primary-purple to-secondary-purple text-white">
                {totalTasks}
              </div>
              <span className="text-gray-800 dark:text-white">Total Tasks</span>
            </div>
            
            <div className="bg-white/30 dark:bg-card-bg/30 backdrop-blur-md rounded-lg px-6 py-3 flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-500 text-white">
                <FaCheckCircle />
              </div>
              <span className="text-gray-800 dark:text-white">{completedTasks} Completed</span>
            </div>
            
            <div className="bg-white/30 dark:bg-card-bg/30 backdrop-blur-md rounded-lg px-6 py-3 flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-500 text-white">
                <FaHourglassHalf />
              </div>
              <span className="text-gray-800 dark:text-white">{pendingTasks} Pending</span>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Quick Task Input Section */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 mt-10">
        <div className="bg-white/40 dark:bg-card-bg backdrop-blur-md rounded-lg p-4 shadow-lg" ref={taskInputRef}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              <input 
                type="text" 
                placeholder="What is the task today?" 
                className="flex-grow bg-white/70 dark:bg-dark-bg/70 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary-purple dark:text-white"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                onKeyPress={handleKeyPress}
                onFocus={() => user && setIsInputFocused(true)}
                disabled={!user}
              />
              <button 
                className={`${user ? 'bg-primary-purple hover:bg-primary-hover' : 'bg-gray-400 cursor-not-allowed'} text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all`}
                onClick={user ? handleAddTask : undefined}
                disabled={!user}
              >
                <span className="text-xl">+</span> Add Task
              </button>
            </div>
            
            {/* Login/Register prompt for non-logged in users */}
            {!user && (
              <div className="text-center py-2 text-sm text-gray-600 dark:text-gray-400">
                <Link to="/login" className="text-primary-purple hover:underline">Login</Link> or <Link to="/register" className="text-primary-purple hover:underline">Register</Link> to add and manage tasks
              </div>
            )}
            
            {/* Additional options that appear when input is focused or has text */}
            {user && (isInputFocused || newTaskText.trim().length > 0) && (
              <div className="flex flex-col md:flex-row items-center gap-4 py-2 animate-fadeIn">
                {/* Due Date Selector */}
                <div className="flex items-center w-full md:w-1/2 relative">
                  <div className="absolute left-3 text-gray-500 dark:text-gray-400">
                    <FaCalendar className="text-primary-purple" />
                  </div>
                  <input 
                    type="date" 
                    className="w-full bg-white/70 dark:bg-dark-bg/70 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary-purple dark:text-white"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    placeholder="Select due date"
                  />
                </div>
                
                {/* Priority Selector */}
                <div className="flex items-center w-full md:w-1/2 relative">
                  <div className="absolute left-3 text-gray-500 dark:text-gray-400">
                    <FaFlag className="text-primary-purple" />
                  </div>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full appearance-none bg-white/70 dark:bg-dark-bg/70 rounded-lg py-3 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-primary-purple dark:text-white cursor-pointer"
                  >
                    <option value="low" className="dark:bg-dark-bg">Low Priority</option>
                    <option value="medium" className="dark:bg-dark-bg">Medium Priority</option>
                    <option value="high" className="dark:bg-dark-bg">High Priority</option>
                  </select>
                  <div className="absolute right-3 top-3 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-3 mt-4">
            <button 
              className={`bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-lg flex items-center gap-2 ${selectedCategory === 'Work' ? 'ring-2 ring-indigo-500' : ''}`}
              onClick={() => setSelectedCategory('Work')}
            >
              <span className="w-5 h-5 flex items-center justify-center">🧰</span> Work
            </button>
            <button 
              className={`bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-lg flex items-center gap-2 ${selectedCategory === 'Personal' ? 'ring-2 ring-blue-500' : ''}`}
              onClick={() => setSelectedCategory('Personal')}
            >
              <span className="w-5 h-5 flex items-center justify-center">🏠</span> Personal
            </button>
            <button 
              className={`bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-4 py-2 rounded-lg flex items-center gap-2 ${selectedCategory === 'Health' ? 'ring-2 ring-green-500' : ''}`}
              onClick={() => setSelectedCategory('Health')}
            >
              <span className="w-5 h-5 flex items-center justify-center">💪</span> Health
            </button>
            <button 
              className={`bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 px-4 py-2 rounded-lg flex items-center gap-2 ${selectedCategory === 'Shopping' ? 'ring-2 ring-yellow-500' : ''}`}
              onClick={() => setSelectedCategory('Shopping')}
            >
              <span className="w-5 h-5 flex items-center justify-center">🛒</span> Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
