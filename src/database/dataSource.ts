import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entitys/User";
import { CONFIG_ENV } from "../configEnv";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: CONFIG_ENV.SERVER_HOST,
  port: CONFIG_ENV.SERVER_DATADASE_PORT,
  username: CONFIG_ENV.SERVER_DATADASE_USERNAME,
  password: CONFIG_ENV.SERVER_DATADASE_PASSWORD,
  database: CONFIG_ENV.SERVER_DATABASE_NAME,
  synchronize: false,
  logging: false,
  entities: [__dirname + "/entitys/*.ts"],
  migrations: [__dirname + "/migrations/*.ts"],
  subscribers: [],
});
