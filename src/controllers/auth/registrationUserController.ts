import UserService from "../../database/repositories/userRepository";
import tokenService from "../../services/tokenService";
import { Request } from "express";
import { hashingPassword } from "../../services/hashingPassword";
import { User } from "../../database/entitys/User";
import {
  TokensType,
  UserFromRequest,
  ResponseWithBody,
} from "../../types/types";
import asyncHandler from "express-async-handler";
import createError from "http-errors";

interface IPayload {
  tokens: TokensType;
  user: UserFromRequest;
}

export const registrationUserController = asyncHandler(
  async (
    req: Request<unknown, unknown, User>,
    res: ResponseWithBody<IPayload>,
  ) => {
    const userData = req.body;
    const isEmainInDatabase = await UserService.getOneByEmail(userData.email);

    if (isEmainInDatabase) {
      throw createError(404, "email is busy");
    }

    const hashedPassword = hashingPassword(userData.password);

    const userWithHash = {
      ...userData,
      password: hashedPassword,
    };

    const user = await UserService.save(userWithHash);

    res.send({
      payload: {
        tokens: {
          accessToken: tokenService.generateAccessToken(user.id),
          refreshToken: tokenService.generateRefreshToken(user.id),
        },
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          dayOfBirthday: user.dayOfBirthday,
        },
      },
      message: "Success",
    });
  },
);
