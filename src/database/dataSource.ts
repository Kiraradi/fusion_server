import "reflect-metadata";
import { DataSource } from "typeorm";
import { config } from "../configEnv";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.SERVER_HOST,
  port: config.SERVER_DATADASE_PORT,
  username: config.SERVER_DATADASE_USERNAME,
  password: config.SERVER_DATADASE_PASSWORD,
  database: config.SERVER_DATABASE_NAME,
  synchronize: false,
  logging: false,
  entities: [__dirname + "/entitys/*.ts"],
  migrations: [__dirname + "/migrations/*.ts"],
  subscribers: [],
});
