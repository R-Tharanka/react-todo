import React, { useState, useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import { FaPlus } from 'react-icons/fa';

const TodoForm = () => {
  const [inputText, setInputText] = useState('');
  const { addTask, error } = useContext(TodoContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      addTask(inputText);
      setInputText('');
    }
  };

  return (
    <form className="task-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="What is the task today?"
        aria-label="Add a new task"
      />
      <button type="submit" aria-label="Add task">
        Add Task <FaPlus style={{ marginLeft: '5px' }} />
      </button>
    </form>
  );
};

export default TodoForm;
