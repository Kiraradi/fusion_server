import { NextFunction, Request } from "express";
import { User } from "../../database/entitys/User";
import { ResponseWithBody } from "../../types/types";
import UserService from "../../services/UserService";

interface IRequestBody {
  fullName?: string;
  email?: string;
  dayOfBirthday?: string;
}

interface IPayload {
  user: User | null;
}

export const editUserController = async (
  req: Request<unknown, unknown, IRequestBody>,
  res: ResponseWithBody<IPayload>,
  next: NextFunction,
) => {
  try {
    const newDataOfUser = req.body;

    const updatedUser = await UserService.editUser(newDataOfUser, req.user.id);

    res.status(200).send({
      payload: {
        user: updatedUser,
      },
      message: "Success",
    });
  } catch (error) {
    next(error);
  }
};
