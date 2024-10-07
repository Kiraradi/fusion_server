import { Router } from "express";
import { authenticateToken } from "../middleware/authenticateToken";
import { getAllUsersController } from "../controllers/users/getAllUsersController"
import { registrationUserController } from "../controllers/users/registrationUserController";
import { loginUserController } from "../controllers/users/loginUserController";
import { getUserController } from "../controllers/users/getUserController.";
const userRouter = Router();


userRouter.get('/all', getAllUsersController);
userRouter.get('/user', getUserController);
userRouter.post('/login', loginUserController);
userRouter.post('/registration', registrationUserController);


export default userRouter;