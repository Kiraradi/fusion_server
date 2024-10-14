import { NextFunction, Request } from "express";
import { ResponseWithBody } from "../types/types";
import UserService from "../database/repositories/userRepository";
import { hashingPassword } from "../services/hashingPassword";
import { CustomError } from "../services/customError";

interface IRequestBody {
  email?: string;
  password: string;
  newPassword?: string;
}

export const checkPassword = async (
  req: Request<unknown, unknown, IRequestBody>,
  res: ResponseWithBody<unknown>,
  next: NextFunction,
) => {
  try {
    const { password } = req.body;
    let user;

    if (req.body.email) {
      user = await UserService.getOneByEmail(req.body.email, {
        withPassword: true,
      });
    } else {
      user = await UserService.getOneByEmail(req.user.email, {
        withPassword: true,
      });
    }

    if (!user) {
      throw new CustomError(404, "User not found");
    }

    const hashOldPassword = hashingPassword(password);

    if (hashOldPassword !== user?.password) {
      throw new CustomError(400, "invalid password");
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
