import { Request } from "express";
import UserService from "../../database/repositories/userRepository";
import { ResponseWithBody } from "../../types/types";
import asyncHandler from "express-async-handler";

export const deleteUserController = asyncHandler(
  async (req: Request, res: ResponseWithBody<unknown>) => {
    await UserService.deleteUser(req.user.id);

    res.status(200).send({ message: "user deleted" });
  },
);
