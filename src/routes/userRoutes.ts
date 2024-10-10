import { Router } from "express";
import { authenticateToken } from "../middleware/authenticateToken";
import { getAllUsersController } from "../controllers/users/getAllUsersController";
import { getUserController } from "../controllers/users/getUserController.";
import { editUserController } from "../controllers/users/editUserController";
import { validateRequestBody } from "../middleware/validateRequestBody";
import { editUserSchame } from "../schemas/editSchema";
import { editPasswordSchema } from "../schemas/editPasswordSchema";
import { editPasswordController } from "../controllers/users/editPasswordController";
import { deleteUserController } from "../controllers/users/deleteUserController";

const userRouter = Router();

userRouter.get("/", getUserController);
userRouter.get("/all", getAllUsersController);
userRouter.put(
  "/edit",
  validateRequestBody(editUserSchame),
  authenticateToken,
  editUserController,
);
userRouter.put(
  "/editPassword",
  validateRequestBody(editPasswordSchema),
  authenticateToken,
  editPasswordController,
);
userRouter.delete("/delete", authenticateToken, deleteUserController);

export default userRouter;
