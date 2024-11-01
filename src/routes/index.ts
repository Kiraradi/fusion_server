import { Router } from "express";
import userRouter from "./userRoutes";
import authRouter from "./authRoutes";
import bookRouter from "./bookRoutes";

const globalRouter = Router();

globalRouter.use("/auth", authRouter);
globalRouter.use("/user", userRouter);
globalRouter.use("/book", bookRouter);

export default globalRouter;
