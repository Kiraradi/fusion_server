import express from 'express';
import dotenv from 'dotenv';

import globalRouter from './routes';
import { AppDataSource } from './database/dataSource';

dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT;

(async () => {
    try {
        await AppDataSource.initialize();
        console.log('Database initialized');
    } catch (err) {
        console.log('Database error initialize');
    }
})();

app.use(express.json());
app.use(globalRouter);

app.listen(PORT, () => {
    console.log(`server listens on port ${PORT}`);
})
