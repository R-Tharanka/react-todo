import React, { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import TodoItem from './TodoItem';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TodoList = () => {
  const { getFilteredTasks, reorderTasks } = useContext(TodoContext);
  const filteredTasks = getFilteredTasks();

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

  if (filteredTasks.length === 0) {
    return <p className="no-tasks">No tasks found.</p>;
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="tasks-list">
        {(provided) => (
          <ul 
            className="tasks-list"
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
                    className={snapshot.isDragging ? "dragging" : ""}
                  >
                    <TodoItem task={task} />
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
