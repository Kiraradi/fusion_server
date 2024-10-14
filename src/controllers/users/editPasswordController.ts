import { NextFunction, Request } from "express";
import UserService from "../../database/repositories/userRepository";
import { hashingPassword } from "../../services/hashingPassword";
import { ResponseWithBody } from "../../types/types";
import { CustomError } from "../../services/customError";

interface IRequestBody {
  password: string;
  newPassword: string;
}
export const editPasswordController = async (
  req: Request<unknown, unknown, IRequestBody>,
  res: ResponseWithBody<null>,
  next: NextFunction,
) => {
  try {
    const { password, newPassword } = req.body;

    const user = await UserService.getOneByEmail(req.user.email, {
      withPassword: true,
    });

    if (!user) {
      throw new CustomError(404, "user not find");
    }
    const hashOldPassword = hashingPassword(password);

    if (user.password !== hashOldPassword) {
      throw new CustomError(400, "password invalid");
    }

    const hashNewPassword = hashingPassword(newPassword);
    const userWithNewPassword = { ...user, password: hashNewPassword };

    await UserService.update(userWithNewPassword.id, userWithNewPassword);

    res.status(200).send({
      payload: null,
      message: "The password has been successfully changed",
    });
  } catch (error) {
    next(error);
  }
};
