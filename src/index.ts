import express from 'express';
import dotenv from 'dotenv';
import { AppDataSource } from './database/dataSource';
dotenv.config();
import globalRouter from './routes';

// declare global {
//     namespace Express {
//         export interface Request {
//             userId?: number
//         }
//     }
// }

const app = express();
const PORT = process.env.SERVER_PORT

AppDataSource.initialize().then(async() => {
    console.log('Database initialized');
}).catch(() => {
    console.log('Database error initialize');
});

app.use(express.json());
app.use(globalRouter);

app.listen(PORT, () => {
    console.log(`server listens on port ${PORT}`);
})

