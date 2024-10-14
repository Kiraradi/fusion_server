import { NextFunction, Request } from "express";
import UserService from "../../database/repositories/userRepository";
import { ResponseWithBody } from "../../types/types";
import { User } from "../../database/entitys/User";
import { CustomError } from "../../services/customError";

interface IQuery {
  id: string;
}

export const getUserController = async (
  req: Request<unknown, unknown, unknown, IQuery>,
  res: ResponseWithBody<User>,
  next: NextFunction,
) => {
  try {
    const userId = Number(req.query.id);

    if (!userId) {
      throw new CustomError(400, "id not find");
    }

    const user = await UserService.getOneById(userId);

    if (!user) {
      throw new CustomError(404, "user not find");
    }

    res.status(200).send({
      payload: user,
      message: "Success",
    });
  } catch (error) {
    next(error);
  }
};
