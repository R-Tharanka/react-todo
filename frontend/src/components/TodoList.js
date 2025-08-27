import React, { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import { AuthContext } from '../context/AuthContext';
import TodoItem from './TodoItem';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FaEye, FaTasks } from 'react-icons/fa';

const TodoList = ({ selectMode = false, selectedTasks = [], setSelectedTasks = () => {} }) => {
  const { getFilteredTasks, reorderTasks } = useContext(TodoContext);
  const { user } = useContext(AuthContext);
  const filteredTasks = getFilteredTasks();
  
  // Toggle task selection
  const toggleTaskSelection = (taskId) => {
    if (selectedTasks.includes(taskId)) {
      setSelectedTasks(selectedTasks.filter(id => id !== taskId));
    } else {
      setSelectedTasks([...selectedTasks, taskId]);
    }
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    // If dropped in the same position
    if (
      result.destination.droppableId === result.source.droppableId &&
      result.destination.index === result.source.index
    ) {
      return;
    }

    reorderTasks(result.source.index, result.destination.index);
  };

  if (!user) {
    return (
      <div className="mt-6 py-8 text-center">
        <FaEye className="mx-auto text-4xl mb-3 text-primary-purple opacity-70" />
        <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">Preview Mode</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-2">
          You're viewing the app in preview mode. 
          <br />Login to manage your personal tasks.
        </p>
        <div className="mt-4 space-y-3">
          {[
            { text: "Complete project proposal", completed: true },
            { text: "Review weekly goals", completed: false },
            { text: "Schedule team meeting", completed: false }
          ].map((demoTask, index) => (
            <div key={index} className="bg-white dark:bg-card-bg shadow-sm rounded-lg px-4 py-3 flex items-center opacity-80">
              <div className={`w-5 h-5 rounded-full border-2 mr-3 flex-shrink-0 ${
                demoTask.completed 
                  ? 'bg-primary-purple border-primary-purple' 
                  : 'border-gray-400 dark:border-gray-600'
              }`}></div>
              <p className={`${demoTask.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-white'}`}>
                {demoTask.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  if (filteredTasks.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-8">
        <FaTasks className="mx-auto text-4xl mb-3 text-gray-400 dark:text-gray-600" />
        <p>No tasks found.</p>
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="tasks-list">
        {(provided) => (
          <ul 
            className="mt-6 space-y-3 w-full px-1 custom-scrollbar"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {filteredTasks.map((task, index) => (
              <Draggable 
                key={task._id} 
                draggableId={task._id} 
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`${snapshot.isDragging ? "shadow-lg ring-2 ring-primary-purple" : ""} ${selectMode ? "relative" : ""}`}
                  >
                    {selectMode && (
                      <div 
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleTaskSelection(task._id);
                        }}
                      >
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer
                          ${selectedTasks.includes(task._id) 
                            ? 'bg-primary-purple border-primary-purple' 
                            : 'border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700'}`}
                        >
                          {selectedTasks.includes(task._id) && (
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </div>
                    )}
                    <TodoItem 
                      task={task} 
                      selectMode={selectMode}
                      isSelected={selectedTasks.includes(task._id)}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TodoList;
