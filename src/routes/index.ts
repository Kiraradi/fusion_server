import { Router } from "express";
import userRouter from "./userRoutes";
import authRouter from "./authRoutes";

const globalRouter = Router();

globalRouter.use('/auth', authRouter);
globalRouter.use('/user', userRouter);

export default globalRouter;