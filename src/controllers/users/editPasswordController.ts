import { Request } from "express";
import UserService from "../../database/repositories/userRepository";
import { hashingPassword } from "../../services/hashingPassword";
import { ResponseWithBody } from "../../types/types";
import asyncHandler from "express-async-handler";
import createError from "http-errors";

interface IRequestBody {
  password: string;
  newPassword?: string;
}
export const editPasswordController = asyncHandler(
  async (
    req: Request<unknown, unknown, IRequestBody>,
    res: ResponseWithBody<null>,
  ) => {
    const { newPassword } = req.body;

    const user = req.user;

    if (!newPassword) {
      throw createError(404, "new passord not find");
    }

    const hashNewPassword = hashingPassword(newPassword);
    const userWithNewPassword = { ...user, password: hashNewPassword };

    await UserService.update(userWithNewPassword.id, userWithNewPassword);

    res.status(200).send({
      payload: null,
      message: "The password has been successfully changed",
    });
  },
);
