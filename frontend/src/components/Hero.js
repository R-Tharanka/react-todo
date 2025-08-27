import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TodoContext } from '../context/TodoContext';
import { AuthContext } from '../context/AuthContext';
import { FaCheckCircle, FaHourglassHalf } from 'react-icons/fa';

const Hero = () => {
  const { tasks } = useContext(TodoContext);
  const { user } = useContext(AuthContext);
  
  // Calculate task statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="relative overflow-hidden mb-10 py-20">
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

      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        {/* Animated heading */}
        <motion.h1 
          className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-purple to-secondary-purple mb-6"
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
    </div>
  );
};

export default Hero;
