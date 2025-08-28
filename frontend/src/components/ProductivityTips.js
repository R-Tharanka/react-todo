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

    // Auto-slide functionality with pause on touch/hover
    useEffect(() => {
        let isPaused = false;
        const containerRef = document.querySelector('.productivity-tips-container');

        const handlePause = () => { isPaused = true; };
        const handleResume = () => { isPaused = false; };

        // Add event listeners to pause auto-slide on interaction
        if (containerRef) {
            containerRef.addEventListener('mouseenter', handlePause);
            containerRef.addEventListener('touchstart', handlePause);
            containerRef.addEventListener('mouseleave', handleResume);
            containerRef.addEventListener('touchend', handleResume);
        }

        const interval = setInterval(() => {
            if (!isPaused) {
                setActiveSlide((prev) => (prev + 1) % tips.length);
            }
        }, 7000); // Change slide every 7 seconds (increased for better mobile reading time)

        return () => {
            clearInterval(interval);
            if (containerRef) {
                containerRef.removeEventListener('mouseenter', handlePause);
                containerRef.removeEventListener('touchstart', handlePause);
                containerRef.removeEventListener('mouseleave', handleResume);
                containerRef.removeEventListener('touchend', handleResume);
            }
        };
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

    // Add simple swipe functionality
    useEffect(() => {
        const container = document.querySelector('.productivity-tips-container');
        let touchStartX = 0;
        let touchEndX = 0;

        function handleTouchStart(e) {
            touchStartX = e.changedTouches[0].screenX;
        }

        function handleTouchEnd(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }

        function handleSwipe() {
            const minSwipeDistance = 50;
            // Left swipe (next slide)
            if (touchStartX - touchEndX > minSwipeDistance) {
                setActiveSlide((activeSlide + 1) % tips.length);
            }
            // Right swipe (previous slide)
            if (touchEndX - touchStartX > minSwipeDistance) {
                setActiveSlide((activeSlide - 1 + tips.length) % tips.length);
            }
        }

        if (container) {
            container.addEventListener('touchstart', handleTouchStart, { passive: true });
            container.addEventListener('touchend', handleTouchEnd, { passive: true });
        }

        return () => {
            if (container) {
                container.removeEventListener('touchstart', handleTouchStart);
                container.removeEventListener('touchend', handleTouchEnd);
            }
        };
    }, [activeSlide, tips.length]);

    return (
        <div className="productivity-tips-container">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Productivity Tips</h2>
                <p className="text-gray-600 dark:text-gray-300">Maximize your efficiency with these proven strategies</p>
            </div>

            <div className="relative">
                {/* Card Slider */}
                <div className="flex flex-col md:flex-row gap-4 sm:gap-6 px-2 overflow-hidden">
                    {getVisibleTips().map((tip, index) => (
                        <div
                            key={tip.id}
                            className={`md:flex-1 transition-all duration-500 transform ${index === 0 ? 'scale-100' : index > 0 ? 'hidden md:block md:scale-95' : ''
                                } ${index > 0 && index < 3 ? 'mb-0' : 'mb-4 md:mb-0'}`}
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

                {/* Navigation dots and mobile controls */}
                <div className="flex flex-col items-center mt-6">
                    {/* Mobile navigation controls */}
                    <div className="flex justify-center items-center mb-4 md:hidden">
                        <button
                            onClick={() => setActiveSlide((activeSlide - 1 + tips.length) % tips.length)}
                            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors mr-4"
                            aria-label="Previous tip"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {activeSlide + 1} / {tips.length}
                        </span>

                        <button
                            onClick={() => setActiveSlide((activeSlide + 1) % tips.length)}
                            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors ml-4"
                            aria-label="Next tip"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    {/* Navigation dots */}
                    <div className="flex justify-center">
                        {tips.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveSlide(index)}
                                className={`mx-1 w-2.5 h-2.5 rounded-full transition-all ${index === activeSlide
                                        ? 'bg-primary-purple w-5'
                                        : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductivityTips;
