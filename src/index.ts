import express from "express";
import dotenv from "dotenv";

import globalRouter from "./routes";
import { AppDataSource } from "./database/dataSource";
import ErrorService from "./services/ErrorService";

dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT;

(async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database initialized");
  } catch (err) {
    console.log("Database error initialize" + err);
  }
})();

app.use(express.json());
app.use(globalRouter);
app.use(ErrorService.errorHandler);

app.listen(PORT, () => {
  console.log(`server listens on port ${PORT}`);
});
