import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import TaskItem from './TaskItem';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  onUpdate: (task: Task) => void;
  onEdit: (task: Task) => void;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onUpdate, onEdit, setTasks }) => {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reordered = Array.from(tasks);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);

    setTasks(reordered);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="task-list">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TaskItem
                      task={task}
                      onDelete={onDelete}
                      onUpdate={onUpdate}
                      onEdit={onEdit}
                    />
                  </li>
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

export default TaskList;
