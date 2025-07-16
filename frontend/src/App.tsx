import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Modal from './components/Modal';
import './styles/App.css';
import { Task } from 'types';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const API_URL = 'http://localhost:4000/api/tasks';

  const fetchTasks = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (task: Task) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    const newTask = await response.json();
    setTasks([...tasks, newTask]);
    closeModal();
  };

  const updateTask = async (updatedTask: Task) => {
    await fetch(`${API_URL}/${updatedTask.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask),
    });
    setTasks(tasks.map(t => (t.id === updatedTask.id ? updatedTask : t)));
    closeModal();
  };

  const deleteTask = async (id: string) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    setTasks(tasks.filter(t => t.id !== id));
  };

  const openModal = (task?: Task) => {
    setSelectedTask(task ?? null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  return (
    <div className="App">
      <button className="toggle-form-btn" onClick={() => openModal()}>
        Nueva tarea
      </button>

      <TaskList
        tasks={tasks}
        onDelete={deleteTask}
        onUpdate={updateTask}
        onEdit={openModal}
        setTasks={setTasks}
      />

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <TaskForm
          addTask={addTask}
          taskToEdit={selectedTask}
          onUpdate={updateTask}
        />
      </Modal>
    </div>
  );
};

export default App;
