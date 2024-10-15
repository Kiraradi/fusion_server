import { Request, NextFunction } from "express";
import UserRepository from "../../database/repositories/userRepository";
import { ResponseWithBody } from "../../types/types";

export const deleteUserController = async (
  req: Request,
  res: ResponseWithBody<null>,
  next: NextFunction,
) => {
  try {
    await UserRepository.deleteUser(req.user.id);

    res.status(200).send({ payload: null, message: "user deleted" });
  } catch (error) {
    next(error);
  }
};
