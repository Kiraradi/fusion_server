import { Router } from "express";
import { authenticateToken } from "../middleware/authenticateToken";
import { getAllUsersController } from "../controllers/users/getAllUsersController"
import { getUserController } from "../controllers/users/getUserController.";
import { editUserController } from "../controllers/users/editUserController";
import { validateRequestBody } from "../middleware/validateRequestBody";
import { editUserSchame } from "../schemas/editSchema";

const userRouter = Router();

userRouter.get('/', getUserController);
userRouter.get('/all', getAllUsersController);
userRouter.put('/edit', validateRequestBody(editUserSchame), authenticateToken, editUserController);


export default userRouter;