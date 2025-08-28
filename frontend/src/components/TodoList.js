/**
 * TodoList Component
 * 
 * Renders the list of tasks with:
 * - Drag and drop reordering functionality
 * - Task selection for bulk actions
 * - Empty state handling
 * - Task filtering based on active filters
 * 
 * Uses react-beautiful-dnd for drag-drop functionality
 */
import React, { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import { AuthContext } from '../context/AuthContext';
import TodoItem from './TodoItem';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FaEye, FaTasks } from 'react-icons/fa';

const TodoList = ({ selectMode = false, selectedTasks = [], setSelectedTasks = () => { } }) => {
  // Get task-related functions and user context
  const { getFilteredTasks, reorderTasks } = useContext(TodoContext);
  const { user } = useContext(AuthContext);
  
  // Get filtered tasks based on current filter/search criteria
  const filteredTasks = getFilteredTasks();

  /**
   * Handles toggling task selection in multi-select mode
   * Adds or removes task IDs from the selectedTasks array
   * 
   * @param {string} taskId - ID of the task to toggle selection
   */
  const toggleTaskSelection = (taskId) => {
    if (selectedTasks.includes(taskId)) {
      // Remove task from selection if already selected
      setSelectedTasks(prevSelected => prevSelected.filter(id => id !== taskId));
    } else {
      // Add task to selection if not already selected
      setSelectedTasks(prevSelected => [...prevSelected, taskId]);
    }
  };

  /**
   * Handles the end of a drag operation
   * Updates task order in state and persists via API
   * 
   * @param {Object} result - Drag result from react-beautiful-dnd
   */
  const handleOnDragEnd = (result) => {
    if (!result.destination) return; // Dropped outside droppable area

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
              <div className={`w-5 h-5 rounded-full border-2 mr-3 flex-shrink-0 ${demoTask.completed
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
            className="mt-6 space-y-3 w-full px-1 custom-scrollbar overflow-x-clip"
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
                    className={`${snapshot.isDragging ? "shadow-lg ring-2 ring-primary-purple" : ""} ${selectMode ? "relative overflow-hidden" : ""} mb-2 group`}
                  >
                    {selectMode && (
                      <div
                        className={`absolute left-0 top-0 bottom-0 w-12 px-3 flex items-center justify-center ${selectedTasks.includes(task._id) ? 'bg-primary-purple/10 dark:bg-primary-purple/20' : 'bg-primary-purple/5 dark:bg-primary-purple/10'} rounded-l-lg z-10 group-hover:shadow-md transition-all duration-200 ease-in-out border-r border-gray-200/50 dark:border-gray-600/50`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleTaskSelection(task._id);
                        }}
                      >
                        <div className="flex flex-col items-center">
                          <div className={`w-6 h-6 rounded-sm border-2 flex items-center justify-center cursor-pointer transition-all duration-200
                            ${selectedTasks.includes(task._id)
                              ? 'bg-primary-purple border-primary-purple scale-110'
                              : 'border-gray-400 dark:border-gray-500 bg-white/80 dark:bg-gray-700/80 hover:border-primary-purple hover:scale-105'}`}
                          >
                            {selectedTasks.includes(task._id) && (
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                          <span className="text-xs mt-1 font-medium text-gray-600 dark:text-gray-300">Select</span>
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
