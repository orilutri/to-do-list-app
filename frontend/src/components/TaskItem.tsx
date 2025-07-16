import React from 'react';
import { Task } from '../types';
import { motion } from 'framer-motion';
import { FiTrash2 } from 'react-icons/fi';

const priorityLabels = {
  low: 'Baja',
  medium: 'Media',
  high: 'Alta',
};

interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  onUpdate: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onEdit, onUpdate }) => {
  const handleToggleCompleted = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const updatedTask: Task = {
      ...task,
      status: task.status === 'completed' ? 'pending' : 'completed',
    };
    onUpdate(updatedTask);
  };

  return (
    <motion.li
      className={`task-item ${task.status === 'completed' ? 'completed' : ''}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      onClick={() => onEdit(task)}
    >
      <input
        type="checkbox"
        checked={task.status === 'completed'}
        onChange={handleToggleCompleted}
        onClick={(e) => e.stopPropagation()}
        style={{ marginRight: '12px' }}
      />
      <div className="task-content">
        <h3 className="task-title">{task.title}</h3>
        <p className="task-description">{task.description}</p>
        <div className="task-meta">
          <span>Vence: {new Date(task.dueDate).toLocaleDateString()}</span>
          <span className={`badge ${task.priority}`}>Prioridad: {priorityLabels[task.priority]}</span>
        </div>
      </div>
      <button
        className="delete-btn"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(task.id);
        }}
        title="Eliminar tarea"
      >
        {React.createElement(FiTrash2 as React.ComponentType<{ size: number }>, { size: 18 })}
      </button>
    </motion.li>
  );
};

export default TaskItem;
