import "reflect-metadata";
import dotenv from 'dotenv';
import { DataSource } from "typeorm";
import { User } from "./entitys/User";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: Number(process.env.SERVER_DATADASE_PORT),
    username: process.env.SERVER_DATADASE_USERNAME as string,
    password: process.env.SERVER_DATADASE_PASSWORD as string,
    database: process.env.SERVER_DATABASE_NAME as string,
    synchronize: true, //
    logging: false,
    entities: [User], //
    migrations: [], //
    subscribers: [],
})