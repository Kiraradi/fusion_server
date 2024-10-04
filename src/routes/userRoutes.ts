import { Router } from "express";
import { authenticateToken } from "../middleware/authenticateToken";
import { getAllUsersController } from "../controllers/users/getAllUsersController"
const userRouter = Router();


userRouter.get('/all', authenticateToken, getAllUsersController)

userRouter.post('/update', )

export default userRouter;