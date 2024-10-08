import { Router } from "express";
import { authenticateToken } from "../middleware/authenticateToken";
import { getAllUsersController } from "../controllers/users/getAllUsersController"
import { registrationUserController } from "../controllers/auth/registrationUserController";
import { loginUserController } from "../controllers/auth/loginUserController";
import { getUserController } from "../controllers/users/getUserController.";
import { editUserController } from "../controllers/users/editUserController";
import { validateRequestBody } from "../middleware/validateRequestBody";
import { registrationSchame } from "../schemas/registrationSchame";
import { loginSchame } from "../schemas/loginSchame";
const userRouter = Router();


userRouter.get('/all', getAllUsersController);
userRouter.get('/user', getUserController);
userRouter.put('edit', authenticateToken, editUserController)


export default userRouter;