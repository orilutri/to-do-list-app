export default class TasksController {
    private tasks: Array<{ id: number; title: string; description: string; dueDate: string; priority: string; status: string }> = [];
    private nextId: number = 1;

    getTasks(req: any, res: any) {
        res.json(this.tasks);
    }

    createTask(req: any, res: any) {
        const { title, description, dueDate, priority, status } = req.body;
        const newTask = { id: this.nextId++, title, description, dueDate, priority, status };
        this.tasks.push(newTask);
        res.status(201).json(newTask);
    }

    updateTask(req: any, res: any) {
        const { id } = req.params;
        const { title, description, dueDate, priority, status } = req.body;
        const taskIndex = this.tasks.findIndex(task => task.id === parseInt(id));

        if (taskIndex !== -1) {
            this.tasks[taskIndex] = { id: parseInt(id), title, description, dueDate, priority, status };
            res.json(this.tasks[taskIndex]);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    }

    deleteTask(req: any, res: any) {
        const { id } = req.params;
        const taskIndex = this.tasks.findIndex(task => task.id === parseInt(id));

        if (taskIndex !== -1) {
            this.tasks.splice(taskIndex, 1);
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    }
}