import { Router } from 'express';
import TasksController from '../controllers/tasksController';

const router = Router();
const tasksController = new TasksController();

export const setTasksRoutes = () => {
    router.get('/', tasksController.getTasks.bind(tasksController));
    router.post('/', tasksController.createTask.bind(tasksController));
    router.put('/:id', tasksController.updateTask.bind(tasksController));
    router.delete('/:id', tasksController.deleteTask.bind(tasksController));

    return router;
};