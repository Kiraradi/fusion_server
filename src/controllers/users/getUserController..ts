import { NextFunction, Request } from "express";
import { ResponseWithBody } from "../../types/types";
import { User } from "../../database/entitys/User";
import UserService from "../../services/UserService";

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

    const user = await UserService.getUserById(userId);

    res.status(200).send({
      payload: user,
      message: "Success",
    });
  } catch (error) {
    next(error);
  }
};
