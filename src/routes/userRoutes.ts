import { Router } from "express";
import { authenticateToken } from "../middleware/authenticateToken";
import { getAllUsersController } from "../controllers/users/getAllUsersController"
import { registrationUserController } from "../controllers/users/registrationUserController";
const userRouter = Router();


userRouter.get('/all', authenticateToken, getAllUsersController);
userRouter.get('/login')
userRouter.post('/registration', registrationUserController);


export default userRouter;