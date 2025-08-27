import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const TodoContext = createContext();

const API_URL = '/api/tasks';

export const TodoProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [dueDate, setDueDate] = useState(null);
  const { user } = useContext(AuthContext);
  
  // Load tasks when user is authenticated
  useEffect(() => {
    if (user) {
      // Load tasks from localStorage on initial render
      const storedTasks = localStorage.getItem(`tasks-${user._id}`);
      if (storedTasks) {
        try {
          setTasks(JSON.parse(storedTasks));
        } catch (error) {
          console.error('Error parsing tasks from localStorage:', error);
        }
      }
      
      // Then fetch from API
      fetchTasks();
    } else {
      // Clear tasks when logged out
      setTasks([]);
    }
  }, [user]);
  
  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`tasks-${user._id}`, JSON.stringify(tasks));
    }
  }, [tasks, user]);
  
  // Fetch all tasks from the API
  const fetchTasks = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setError('Failed to fetch tasks. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  // Add a new task
  const addTask = async (text, dueDate = null, priority = 0) => {
    if (!text || text.trim() === '') {
      setError('Task text cannot be empty!');
      return;
    }
    
    setLoading(true);
    try {
      const taskData = { 
        text, 
        completed: false,
        createdAt: new Date().toISOString()
      };
      
      if (dueDate) {
        taskData.dueDate = dueDate;
      }
      
      if (priority > 0) {
        taskData.priority = priority;
      }
      
      const response = await axios.post(API_URL, taskData);
      setTasks([response.data, ...tasks]);
      setError(null);
    } catch (error) {
      console.error('Error adding task:', error);
      setError('Failed to add task. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Update an existing task
  const updateTask = async (id, updatedText, dueDate = null, priority = null) => {
    if (!updatedText || updatedText.trim() === '') {
      setError('Task text cannot be empty!');
      return;
    }
    
    setLoading(true);
    try {
      // Get the existing task to preserve any fields we're not updating
      const existingTask = tasks.find(task => task._id === id);
      if (!existingTask) {
        throw new Error('Task not found');
      }
      
      const updateData = {
        text: updatedText,
        dueDate: dueDate !== null ? dueDate : existingTask.dueDate,
        priority: priority !== null ? priority : existingTask.priority
      };
      
      const response = await axios.put(`${API_URL}/${id}`, updateData);
      setTasks(tasks.map(task => task._id === id ? response.data : task));
      setError(null);
    } catch (error) {
      console.error('Error updating task:', error);
      setError('Failed to update task. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Toggle task completion status
  const toggleComplete = async (id) => {
    const taskToToggle = tasks.find(task => task._id === id);
    if (!taskToToggle) return;
    
    setLoading(true);
    try {
      const response = await axios.patch(`${API_URL}/${id}/toggle`);
      setTasks(tasks.map(task => task._id === id ? response.data : task));
      setError(null);
    } catch (error) {
      console.error('Error toggling task completion:', error);
      setError('Failed to update task status. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Delete a task
  const deleteTask = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
      setError(null);
    } catch (error) {
      console.error('Error deleting task:', error);
      setError('Failed to delete task. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Reorder tasks (for drag and drop functionality)
  const reorderTasks = (startIndex, endIndex) => {
    const result = Array.from(tasks);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setTasks(result);
  };
  
  // Get filtered tasks based on filter, search term, and sort option
  const getFilteredTasks = () => {
    let filteredTasks = [...tasks];
    
    // Apply filter
    switch (filter) {
      case 'completed':
        filteredTasks = filteredTasks.filter(task => task.completed);
        break;
      case 'today':
        // Filter tasks due today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        filteredTasks = filteredTasks.filter(task => {
          if (!task.dueDate) return false;
          const taskDate = new Date(task.dueDate);
          return taskDate >= today && taskDate < tomorrow;
        });
        break;
      case 'upcoming':
        // Filter tasks due in the future (after today)
        const futureDate = new Date();
        futureDate.setHours(0, 0, 0, 0);
        futureDate.setDate(futureDate.getDate() + 1);
        
        filteredTasks = filteredTasks.filter(task => {
          if (!task.dueDate) return false;
          const taskDate = new Date(task.dueDate);
          return taskDate >= futureDate && !task.completed;
        });
        break;
      case 'overdue':
        // Filter overdue tasks (past due date and not completed)
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        
        filteredTasks = filteredTasks.filter(task => {
          if (!task.dueDate || task.completed) return false;
          const taskDate = new Date(task.dueDate);
          taskDate.setHours(0, 0, 0, 0);
          return taskDate < currentDate;
        });
        break;
      case 'all':
        // No additional filtering for 'all'
        break;
      default:
        // Default is to show all tasks
        break;
    }
    
    // Apply search
    if (searchTerm.trim() !== '') {
      filteredTasks = filteredTasks.filter(task => 
        task.text.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'newest':
        filteredTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        filteredTasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'priority':
        // Sort by priority (high to low)
        filteredTasks.sort((a, b) => (b.priority || 0) - (a.priority || 0));
        break;
      case 'az':
        filteredTasks.sort((a, b) => a.text.localeCompare(b.text));
        break;
      default:
        // Default to newest first
        filteredTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    
    return filteredTasks;
  };
  
  return (
    <TodoContext.Provider 
      value={{
        tasks,
        loading,
        error,
        filter,
        searchTerm,
        sortBy,
        dueDate,
        setFilter,
        setSearchTerm,
        setSortBy,
        setDueDate,
        getFilteredTasks,
        addTask,
        updateTask,
        toggleComplete,
        deleteTask,
        reorderTasks,
        fetchTasks
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
