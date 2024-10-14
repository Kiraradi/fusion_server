import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entitys/User";
import { PROCESS_ENV } from "../constants";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: PROCESS_ENV.SERVER_HOST,
  port: PROCESS_ENV.SERVER_DATADASE_PORT,
  username: PROCESS_ENV.SERVER_DATADASE_USERNAME,
  password: PROCESS_ENV.SERVER_DATADASE_PASSWORD,
  database: PROCESS_ENV.SERVER_DATABASE_NAME,
  synchronize: false,
  logging: false,
  entities: [__dirname + "/entitys/*.ts"],
  migrations: [__dirname + "/migrations/*.ts"],
  subscribers: [],
});
