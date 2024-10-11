import { Request } from "express";
import { getAll } from "../../database/repositories/userRepository";
import { ResponseWithBody } from "../../types/types";
import { User } from "../../database/entitys/User";
import asyncHandler from "express-async-handler";

export const getAllUsersController = asyncHandler(
  async (req: Request, res: ResponseWithBody<User[]>) => {
    const allUsers = await getAll();

    res.status(200).send({
      payload: allUsers,
      message: "Success",
    });
  },
);
