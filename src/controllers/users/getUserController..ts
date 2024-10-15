import { NextFunction, Request } from "express";
import { ResponseWithBody } from "../../types/types";
import { User } from "../../database/entitys/User";
import UserService from "../../services/UserService";
import { CustomError } from "../../services/customError";

interface IQuery {
  id: string;
}

export const getUserController = async (
  req: Request<IQuery, unknown, unknown>,
  res: ResponseWithBody<User>,
  next: NextFunction,
) => {
  try {
    const userId = Number(req.params.id);

    if (!userId) {
      throw new CustomError(404, "id not found");
    }

    const user = await UserService.getUserById(userId);

    res.status(200).send({
      payload: user,
      message: "Success",
    });
  } catch (error) {
    next(error);
  }
};
