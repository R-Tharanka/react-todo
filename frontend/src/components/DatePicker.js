import React, { useState, useRef, useEffect } from 'react';
import { FaCalendarAlt, FaTimes } from 'react-icons/fa';

const DatePicker = ({ selectedDate, onDateChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const calendarRef = useRef(null);

  useEffect(() => {
    // If a date is already selected, set the calendar to that month/year
    if (selectedDate) {
      const date = new Date(selectedDate);
      setMonth(date.getMonth());
      setYear(date.getFullYear());
    }
  }, [selectedDate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleCalendar = () => {
    setIsOpen(!isOpen);
  };

  const clearDate = (e) => {
    e.stopPropagation();
    onDateChange(null);
  };

  const goToPreviousMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const goToNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const handleDateClick = (day) => {
    const newDate = new Date(year, month, day);
    onDateChange(newDate.toISOString());
    setIsOpen(false);
  };

  const renderCalendarDays = () => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isSelected = selectedDate && new Date(selectedDate).toDateString() === date.toDateString();
      const isToday = new Date().toDateString() === date.toDateString();

      days.push(
        <button
          key={day}
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm
            ${isSelected ? 'bg-primary-purple text-white' :
              isToday ? 'bg-gray-200 dark:bg-gray-700' : ''} 
            hover:bg-gray-200 dark:hover:bg-gray-700`}
          onClick={() => handleDateClick(day)}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const formatSelectedDate = () => {
    if (!selectedDate) return '';
    const date = new Date(selectedDate);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="relative" ref={calendarRef}>
      <div
        className={`flex items-center px-3 py-2 rounded-lg border ${selectedDate ? 'border-primary-purple' : 'border-gray-300 dark:border-gray-600'
          } cursor-pointer`}
        onClick={toggleCalendar}
      >
        <FaCalendarAlt className="text-gray-500 dark:text-gray-400 mr-2" />
        <span className={`flex-grow ${selectedDate ? 'text-gray-800 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
          {selectedDate ? formatSelectedDate() : 'Set due date'}
        </span>
        {selectedDate && (
          <button
            onClick={clearDate}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            aria-label="Clear date"
          >
            <FaTimes />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute mt-1 bg-white dark:bg-card-bg rounded-lg shadow-lg p-2 z-10">
          <div className="flex justify-between items-center mb-2 px-1">
            <button
              onClick={goToPreviousMonth}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              &lt;
            </button>
            <div className="font-medium">
              {new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </div>
            <button
              onClick={goToNextMonth}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              &gt;
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
              <div key={index} className="w-8 h-8 text-gray-500 dark:text-gray-400 text-sm font-medium">
                {day}
              </div>
            ))}
            {renderCalendarDays()}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
