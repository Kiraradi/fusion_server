import { Request } from "express";
import UserService from "../../database/repositories/userRepository";
import { DeepPartial } from "typeorm";
import { User } from "../../database/entitys/User";
import { ResponseWithBody } from "../../types/types";
import asyncHandler from "express-async-handler";
import createError from "http-errors";

interface IRequestBody {
  fullName?: string;
  email?: string;
  dayOfBirthday?: string;
}

interface IPayload {
  user: User | null;
}

export const editUserController = asyncHandler(
  async (
    req: Request<unknown, unknown, IRequestBody>,
    res: ResponseWithBody<IPayload>,
  ) => {
    const newDataOfUser = req.body;

    if (Object.keys(newDataOfUser).length === 0) {
      res.status(404).send({ message: "no new parameters found" });
    }

    const user = { ...req.user };

    const { email, ...rest } = req.body;

    const dataToUpdate: DeepPartial<User> = rest;

    if (email) {
      const isEmailBusy = await UserService.getOneByEmail(email);

      if (isEmailBusy) {
        throw createError(400, "email is busy");
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
  },
);
