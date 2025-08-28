import React, { useState, useEffect } from 'react';
import { FaLightbulb, FaClock, FaTrophy, FaBell, FaBrain } from 'react-icons/fa';

const ProductivityTips = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  
  const tips = [
    {
      id: 1,
      icon: <FaLightbulb className="text-yellow-500" />,
      title: "Set Clear Goals",
      description: "Break down large projects into smaller, manageable tasks to maintain focus and momentum."
    },
    {
      id: 2,
      icon: <FaClock className="text-blue-500" />,
      title: "Time Blocking",
      description: "Allocate specific time slots for different types of tasks to improve focus and productivity."
    },
    {
      id: 3,
      icon: <FaTrophy className="text-purple-500" />,
      title: "Celebrate Wins",
      description: "Acknowledge your accomplishments, no matter how small, to maintain motivation."
    },
    {
      id: 4,
      icon: <FaBell className="text-red-500" />,
      title: "Take Regular Breaks",
      description: "Use techniques like Pomodoro (25 min work, 5 min break) to maintain energy and avoid burnout."
    },
    {
      id: 5,
      icon: <FaBrain className="text-green-500" />,
      title: "Single-Task Focus",
      description: "Focus on one important task at a time rather than multitasking for better quality results."
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % tips.length);
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(interval);
  }, [tips.length]);

  // Calculate which tips to show (current + 2 next)
  const getVisibleTips = () => {
    const visibleTips = [];
    for (let i = 0; i < 3; i++) {
      const index = (activeSlide + i) % tips.length;
      visibleTips.push(tips[index]);
    }
    return visibleTips;
  };

  return (
    <div>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Productivity Tips</h2>
        <p className="text-gray-600 dark:text-gray-300">Maximize your efficiency with these proven strategies</p>
      </div>
      
      <div className="relative">
        {/* Card Slider */}
        <div className="flex gap-4 sm:gap-6 px-2 overflow-hidden">
          {getVisibleTips().map((tip, index) => (
            <div 
              key={tip.id}
              className={`flex-1 transition-all duration-500 transform ${
                index === 0 ? 'scale-100' : 'scale-95'
              }`}
            >
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-xl p-5 h-full border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 mr-3">
                    {tip.icon}
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">{tip.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{tip.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Navigation dots */}
        <div className="flex justify-center mt-6">
          {tips.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`mx-1 w-2.5 h-2.5 rounded-full transition-all ${
                index === activeSlide 
                  ? 'bg-primary-purple w-5' 
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductivityTips;
