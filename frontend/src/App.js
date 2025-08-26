import React, { useContext } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import SearchBox from './components/SearchBox';
import FilterButtons from './components/FilterButtons';
import { TodoContext } from './context/TodoContext';
import { ThemeContext } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import { FaSpinner } from 'react-icons/fa';

function App() {
  const { loading, error } = useContext(TodoContext);
  const { theme } = useContext(ThemeContext);
  
  return (
    <div className={`App ${theme}`}>
      <div className="container">
        <div className="todo-app">
          <h1 className="app-title">Get Things Done!</h1>
          <TodoForm />
          
          <SearchBox />
          <FilterButtons />
          
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
      <ThemeToggle />
    </div>
  );
}

export default App;
