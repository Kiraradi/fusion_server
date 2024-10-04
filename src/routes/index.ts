import { Router } from "express";
import userRouter from "./userRoutes";

const globalRouter = Router();

globalRouter.use('/user', userRouter)

export default globalRouter