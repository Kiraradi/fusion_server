import { NextFunction, Request } from "express";
import { ResponseWithBody } from "../types/types";
import UserService from "../database/repositories/userRepository";
import asyncHandler from "express-async-handler";
import { hashingPassword } from "../services/hashingPassword";
import createError from "http-errors";

interface IRequestBody {
  email?: string;
  password: string;
  newPassword?: string;
}

export const checkPassword = asyncHandler(
  async (
    req: Request<unknown, unknown, IRequestBody>,
    res: ResponseWithBody<unknown>,
    next: NextFunction,
  ) => {
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
      throw createError(404, "User not found");
    }

    const hashOldPassword = hashingPassword(password);

    if (hashOldPassword !== user?.password) {
      throw createError(400, "invalid password");
    }

    req.user = user;

    next();
  },
);
