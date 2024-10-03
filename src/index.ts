import express from 'express';
import dotenv from 'dotenv'
import { AppDataSource } from './database/data-source';
dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT

app.listen(PORT, () => {
    console.log(`server listens on port ${PORT}`);
})