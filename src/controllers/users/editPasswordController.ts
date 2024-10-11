import { Request } from "express";
import UserService from "../../database/repositories/userRepository";
import { hashingPassword } from "../../services/hashingPassword";
import { ResponseWithBody } from "../../types/types";
import asyncHandler from "express-async-handler";
import createError from "http-errors";

interface IRequestBody {
  oldPassword: string;
  newPassword: string;
}
export const editPasswordController = asyncHandler(
  async (
    req: Request<unknown, unknown, IRequestBody>,
    res: ResponseWithBody<unknown>,
  ) => {
    const { oldPassword, newPassword } = req.body;

    const user = await UserService.getOneByEmail(req.user.email, {
      withPassword: true,
    });

    const hashOldPassword = hashingPassword(oldPassword);

    if (hashOldPassword !== user?.password) {
      throw createError(400, "invalid password");
    }

    if (oldPassword === newPassword) {
      throw createError(400, "The old and new passwords must not match");
    }

    const hashNewPassword = hashingPassword(newPassword);
    const userWithNewPassword = { ...user, password: hashNewPassword };

    await UserService.update(userWithNewPassword.id, userWithNewPassword);

    res
      .status(200)
      .send({ message: "The password has been successfully changed" });
  },
);
