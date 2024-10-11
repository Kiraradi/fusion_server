import { Request } from "express";
import UserService from "../../database/repositories/userRepository";
import { ResponseWithBody } from "../../types/types";
import { User } from "../../database/entitys/User";
import asyncHandler from "express-async-handler";
import createError from "http-errors";

interface IQuery {
  id: string;
}

export const getUserController = asyncHandler(
  async (
    req: Request<unknown, unknown, unknown, IQuery>,
    res: ResponseWithBody<User>,
  ) => {
    const userId = Number(req.query.id);

    if (!userId) {
      throw createError(400, "id not find");
    }

    const user = await UserService.getOneById(userId);

    if (!user) {
      throw createError(404, "user not find");
    }

    res.status(200).send({
      payload: user,
      message: "Success",
    });
  },
);
