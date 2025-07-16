import React, { useState, useEffect } from 'react';
import { Task } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface TaskFormProps {
  addTask: (task: Task) => Promise<void>;
  onUpdate: (task: Task) => void;
  taskToEdit?: Task | null;
}

const TaskForm: React.FC<TaskFormProps> = ({ addTask, onUpdate, taskToEdit }) => {
  const [title, setTitle] = useState(taskToEdit?.title ?? '');
  const [description, setDescription] = useState(taskToEdit?.description ?? '');
  const [dueDate, setDueDate] = useState(taskToEdit ? new Date(taskToEdit.dueDate).toISOString().split('T')[0] : '');
  const [priority, setPriority] = useState(taskToEdit?.priority ?? 'medium');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedTask: Task = {
      id: taskToEdit?.id ?? crypto.randomUUID(),
      title,
      description,
      dueDate: new Date(dueDate),
      priority: priority as 'low' | 'medium' | 'high',
      status: taskToEdit?.status ?? 'pending',
    };

    if (taskToEdit) {
      onUpdate(updatedTask);
    } else {
      await addTask(updatedTask);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{taskToEdit ? 'Editar tarea' : 'Nueva tarea'}</h2>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}>
        <option value="low">Baja</option>
        <option value="medium">Media</option>
        <option value="high">Alta</option>
      </select>
      <button type="submit">
        {taskToEdit ? 'Guardar cambios' : 'Agregar tarea'}
      </button>
    </form>
  );
};

export default TaskForm;
