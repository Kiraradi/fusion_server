import { NextFunction, Request } from "express";
import { ResponseWithBody } from "../../types/types";
import UserService from "../../services/UserService";

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

    await UserService.editPassword(password, newPassword, req.user.email);

    res.status(200).send({
      payload: null,
      message: "The password has been successfully changed",
    });
  } catch (error) {
    next(error);
  }
};
