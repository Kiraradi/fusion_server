import { NextFunction, Request } from "express";
import UserService from "../../database/repositories/userRepository";
import { DeepPartial } from "typeorm";
import { User } from "../../database/entitys/User";
import { ResponseWithBody } from "../../types/types";
import { CustomError } from "../../services/customError";

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

    if (Object.keys(newDataOfUser).length === 0) {
      throw new CustomError(404, "no new parameters found");
    }

    const user = { ...req.user };

    const { email, ...rest } = req.body;

    const dataToUpdate: DeepPartial<User> = rest;

    if (email) {
      const isEmailBusy = await UserService.getOneByEmail(email);

      if (isEmailBusy) {
        throw new CustomError(400, "email is busy");
      }
    }

    dataToUpdate.email = email;

    await UserService.update(user.id, dataToUpdate);

    const updatedUser = await UserService.getOneById(user.id);

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
