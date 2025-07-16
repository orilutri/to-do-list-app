import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import { setTasksRoutes } from './routes/tasksRoutes';

const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());

app.use(json());
app.use('/api/tasks', setTasksRoutes());


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
