import { Router } from "express";
import { authenticateToken } from "../middleware/authenticateToken";
import { getAllUsersController } from "../controllers/users/getAllUsersController";
import { getUserController } from "../controllers/users/getUserController.";
import { editUserController } from "../controllers/users/editUserController";
import { validateRequestBody } from "../middleware/validateRequestBody";
import { editPasswordController } from "../controllers/users/editPasswordController";
import { deleteUserController } from "../controllers/users/deleteUserController";
import { editUserSchama } from "../services/validation/schemas/editSchema";
import { editPasswordSchema } from "../services/validation/schemas/editPasswordSchema";
import { getUserSchama } from "../services/validation/schemas/getUserSchema";

const userRouter = Router();

userRouter.get("/:id", validateRequestBody(getUserSchama), getUserController);
userRouter.get("/all", getAllUsersController);
userRouter.put(
  "/edit",
  validateRequestBody(editUserSchama),
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
