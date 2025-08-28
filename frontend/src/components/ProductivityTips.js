import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FaLightbulb, FaClock, FaTrophy, FaBell, FaBrain } from 'react-icons/fa';

const ProductivityTips = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoSlideTimerRef = useRef(null);
  
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
  
  // Reset the auto-slide timer when user interacts
  const resetAutoSlideTimer = useCallback(() => {
    if (autoSlideTimerRef.current) {
      clearInterval(autoSlideTimerRef.current);
    }
    
    autoSlideTimerRef.current = setInterval(() => {
      goToNextSlide();
    }, 10000); // Change slide every 10 seconds
  }, []);
  
  // Smoothly go to next slide with transition state
  const goToNextSlide = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setActiveSlide((prev) => (prev + 1) % tips.length);
    
    // Reset transitioning state after animation completes (increased duration)
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1500);
  }, [isTransitioning, tips.length]);
  
  // Smoothly go to previous slide with transition state
  const goToPrevSlide = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setActiveSlide((prev) => (prev - 1 + tips.length) % tips.length);
    
    // Reset transitioning state after animation completes (increased duration)
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1500);
  }, [isTransitioning, tips.length]);

  // Go to a specific slide (for dot navigation)
  const goToSlide = useCallback((index) => {
    if (isTransitioning || index === activeSlide) return;
    
    setIsTransitioning(true);
    setActiveSlide(index);
    resetAutoSlideTimer();
    
    // Reset transitioning state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1500);
  }, [activeSlide, isTransitioning, resetAutoSlideTimer]);
  
  // Set up auto-slide on component mount
  useEffect(() => {
    resetAutoSlideTimer();
    
    return () => {
      if (autoSlideTimerRef.current) {
        clearInterval(autoSlideTimerRef.current);
      }
    };
  }, [resetAutoSlideTimer]);

  // We're no longer using this function since we're showing all tips with positioning
  // This is kept for reference but can be removed

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Productivity Tips</h2>
        <p className="text-gray-600">Maximize your efficiency with these proven strategies</p>
      </div>
      
      <div className="relative">
        {/* Navigation controls */}
        <div className="absolute -left-4 top-1/2 -translate-y-1/2 z-30">
          <button 
            onClick={() => {
              goToPrevSlide();
              resetAutoSlideTimer();
            }}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/60 hover:bg-white/90 shadow-md transition-all transform hover:scale-110 focus:outline-none"
            disabled={isTransitioning}
            aria-label="Previous tip"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
        
        <div className="absolute -right-4 top-1/2 -translate-y-1/2 z-30">
          <button 
            onClick={() => {
              goToNextSlide();
              resetAutoSlideTimer();
            }}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/60 hover:bg-white/90 shadow-md transition-all transform hover:scale-110 focus:outline-none"
            disabled={isTransitioning}
            aria-label="Next tip"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        {/* Card Slider - Enhanced Circular Animation */}
        <div className="relative h-56 sm:h-64 overflow-hidden mx-auto max-w-3xl">
          {tips.map((tip, index) => {
            // Calculate position relative to active slide (for circular effect)
            const position = (index - activeSlide + tips.length) % tips.length;
            // Determine if this card should be visible (show 3 cards at a time)
            const isVisible = position <= 2;
            
            return (
              <div 
                key={tip.id}
                className={`absolute top-0 w-full sm:w-4/5 md:w-3/4 transition-all duration-1200 ease-in-out ${
                  isTransitioning ? 'opacity-90' : 'opacity-100'
                } ${!isVisible && 'opacity-0 pointer-events-none'}`}
                style={{
                  transform: position === 0 
                    ? 'translateX(0) scale(1)'
                    : position === 1
                      ? 'translateX(85%) scale(0.85)'
                      : position === 2 
                        ? 'translateX(160%) scale(0.7)'
                        : 'translateX(-100%) scale(0.7)',
                  right: position === 0 ? '50%' : position === 1 ? '10%' : '0',
                  zIndex: 30 - position,
                  marginRight: position === 0 ? '-35%' : '0',
                }}
              >
                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-5 h-full border border-gray-200 shadow-lg hover:shadow-xl transition-all mx-4">
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-full bg-gray-100/80 mr-3">
                      {tip.icon}
                    </div>
                    <h3 className="font-semibold text-gray-800">{tip.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm">{tip.description}</p>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Progress indicator */}
        <div className="flex justify-center mt-8">
          {tips.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`mx-1.5 transition-all ${
                index === activeSlide 
                  ? 'h-3 w-8 bg-primary-purple rounded-full' 
                  : 'h-3 w-3 bg-gray-300 hover:bg-gray-400 rounded-full'
              }`}
              disabled={isTransitioning}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductivityTips;
