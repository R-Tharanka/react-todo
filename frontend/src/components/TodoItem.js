import React, { useState, useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import { FaEdit, FaTrash, FaCheck, FaTimes, FaSave } from 'react-icons/fa';

const TodoItem = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const { toggleComplete, updateTask, deleteTask } = useContext(TodoContext);

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(task.text);
  };

  const handleSave = () => {
    if (editText.trim() !== '') {
      updateTask(task._id, editText);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditText(task.text);
  };

  return (
    <li className="task-item">
      <div 
        className="task-checkbox" 
        onClick={() => toggleComplete(task._id)}
        role="checkbox"
        aria-checked={task.completed}
        tabIndex={0}
      >
        {task.completed ? (
          <FaCheck style={{ color: 'white' }} />
        ) : (
          <div 
            style={{ 
              width: '15px', 
              height: '15px', 
              border: '2px solid white',
              borderRadius: '3px'
            }} 
          />
        )}
      </div>

      {isEditing ? (
        <input
          type="text"
          className="task-input-edit"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          autoFocus
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
        />
      ) : (
        <p className={`task-text ${task.completed ? 'completed' : ''}`}>
          {task.text}
        </p>
      )}

      <div className="task-actions">
        {isEditing ? (
          <>
            <button onClick={handleSave} aria-label="Save">
              <FaSave />
            </button>
            <button onClick={handleCancel} aria-label="Cancel">
              <FaTimes />
            </button>
          </>
        ) : (
          <>
            <button onClick={handleEdit} aria-label="Edit">
              <FaEdit />
            </button>
            <button onClick={() => deleteTask(task._id)} aria-label="Delete">
              <FaTrash />
            </button>
          </>
        )}
      </div>
    </li>
  );
};

export default TodoItem;
