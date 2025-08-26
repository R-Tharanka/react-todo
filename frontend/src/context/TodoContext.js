import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const TodoContext = createContext();

const API_URL = '/api/tasks';

export const TodoProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Load tasks from localStorage on initial render
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      try {
        setTasks(JSON.parse(storedTasks));
      } catch (error) {
        console.error('Error parsing tasks from localStorage:', error);
      }
    }
    
    // Then fetch from API
    fetchTasks();
  }, []);
  
  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  
  // Fetch all tasks from the API
  const fetchTasks = async () => {
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
  const addTask = async (text) => {
    if (!text || text.trim() === '') {
      setError('Task text cannot be empty!');
      return;
    }
    
    setLoading(true);
    try {
      const response = await axios.post(API_URL, { text });
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
  const updateTask = async (id, updatedText) => {
    if (!updatedText || updatedText.trim() === '') {
      setError('Task text cannot be empty!');
      return;
    }
    
    setLoading(true);
    try {
      const response = await axios.put(`${API_URL}/${id}`, { text: updatedText });
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
  
  // Get filtered tasks based on filter and search term
  const getFilteredTasks = () => {
    let filteredTasks = [...tasks];
    
    // Apply filter (all, active, completed)
    if (filter === 'active') {
      filteredTasks = filteredTasks.filter(task => !task.completed);
    } else if (filter === 'completed') {
      filteredTasks = filteredTasks.filter(task => task.completed);
    }
    
    // Apply search
    if (searchTerm.trim() !== '') {
      filteredTasks = filteredTasks.filter(task => 
        task.text.toLowerCase().includes(searchTerm.toLowerCase())
      );
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
        setFilter,
        setSearchTerm,
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
