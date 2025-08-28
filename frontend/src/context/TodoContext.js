import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import API from '../config/api';

export const TodoContext = createContext();

// Use API.baseURL + /api/tasks
const API_URL = `${API.baseURL}/api/tasks`;

export const TodoProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [dueDate, setDueDate] = useState(null);
  const { user } = useContext(AuthContext);
  
  // Load tasks when user is authenticated or when filter/sortBy changes
  useEffect(() => {
    if (user) {
      // Load tasks from localStorage on initial render (only when user changes)
      if (!tasks.length) {
        const storedTasks = localStorage.getItem(`tasks-${user._id}`);
        if (storedTasks) {
          try {
            setTasks(JSON.parse(storedTasks));
          } catch (error) {
            console.error('Error parsing tasks from localStorage:', error);
          }
        }
      }
      
      // Fetch from API
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
  
  // Refetch tasks when filter or sort options change
  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [filter, sortBy]);
  
  // Fetch all tasks from the API
  const fetchTasks = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Include filter and sort parameters if they are set
      let url = API_URL;
      const params = new URLSearchParams();
      
      if (filter && filter !== 'all') {
        params.append('filter', filter);
      }
      
      if (sortBy) {
        params.append('sort', sortBy);
      }
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      
      const response = await axios.get(url);
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
  const addTask = async (text, dueDate = null, priority = 0, category = '') => {
    if (!text || text.trim() === '') {
      setError('Task text cannot be empty!');
      return false;
    }
    
    setLoading(true);
    try {
      // Create task data object with all properties
      const taskData = { 
        text, 
        completed: false
      };
      
      // Always include these properties in the request, even if null/empty
      taskData.dueDate = dueDate;
      taskData.priority = priority;
      taskData.category = category;
      
      console.log("Sending task data:", taskData); // Debug log
      
      const response = await axios.post(API_URL, taskData);
      setTasks([response.data, ...tasks]);
      setError(null);
      return true; // Return success status
    } catch (error) {
      console.error('Error adding task:', error);
      setError('Failed to add task. Please try again.');
      return false; // Return failure status
    } finally {
      setLoading(false);
    }
  };
  
  // Update an existing task
  const updateTask = async (id, updatedText, dueDate = null, priority = null, category = null) => {
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
        priority: priority !== null ? priority : existingTask.priority,
        category: category !== null ? category : existingTask.category
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
  
  // Delete multiple tasks at once
  const deleteMultipleTasks = async (taskIds) => {
    if (!taskIds.length) {
      console.log('No tasks to delete (empty taskIds array)');
      return;
    }
    
    console.log(`Deleting multiple tasks. Task IDs:`, taskIds);
    setLoading(true);
    try {
      // Create an array of promises for each delete operation
      const deletePromises = taskIds.map(id => {
        console.log(`Sending DELETE request for task ${id}`);
        return axios.delete(`${API_URL}/${id}`);
      });
      
      // Wait for all delete operations to complete
      await Promise.all(deletePromises);
      console.log('All delete operations completed successfully');
      
      // Remove the deleted tasks from state
      setTasks(prevTasks => {
        const newTasks = prevTasks.filter(task => !taskIds.includes(task._id));
        console.log(`Filtered tasks. Before: ${prevTasks.length}, After: ${newTasks.length}`);
        return newTasks;
      });
      setError(null);
    } catch (error) {
      console.error('Error deleting multiple tasks:', error);
      setError('Failed to delete selected tasks. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Delete all completed tasks
  const deleteCompletedTasks = async () => {
    console.log('deleteCompletedTasks function called');
    console.log('Current tasks:', tasks);
    
    const completedTaskIds = tasks
      .filter(task => task.completed)
      .map(task => task._id);
      
    console.log('Completed tasks IDs:', completedTaskIds);
      
    if (completedTaskIds.length === 0) {
      console.log('No completed tasks to delete');
      return; // No completed tasks to delete
    }
    
    console.log(`Deleting ${completedTaskIds.length} completed tasks`);
    await deleteMultipleTasks(completedTaskIds);
    console.log('Completed tasks deletion finished');
  };
  
  // Get filtered tasks (mostly used for search functionality)
  const getFilteredTasks = () => {
    // The server already handles filter and sort, we just need to handle searchTerm here
    let filteredTasks = [...tasks];
    
    // Apply search filtering if needed
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
        fetchTasks,
        deleteMultipleTasks,
        deleteCompletedTasks
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
