import React, { useContext } from 'react';
import TodoList from '../components/TodoList';
import TodoForm from '../components/TodoForm';
import SearchBox from '../components/SearchBox';
import FilterButtons from '../components/FilterButtons';
import { TodoContext } from '../context/TodoContext';
import { FaSpinner } from 'react-icons/fa';

const HomePage = () => {
  const { loading, error } = useContext(TodoContext);
  
  return (
    <div className="home-page">
      <div className="todo-app">
        <h1 className="app-title">Get Things Done!</h1>
        <TodoForm />
        
        <div className="todo-actions">
          <SearchBox />
          <FilterButtons />
        </div>
        
        {loading ? (
          <div className="loader">
            <FaSpinner className="loader-spinner" />
          </div>
        ) : (
          <TodoList />
        )}
        
        {error && (
          <div className="error-message">{error}</div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
