import { Request } from "express";
import { hashingPassword } from "../../services/hashingPassword";
import UserService from "../../database/repositories/userRepository";
import tokenService from "../../services/tokenService";
import asyncHandler from "express-async-handler";
import createError from "http-errors";
import {
  ResponseWithBody,
  TokensType,
  UserWithoutPassordType,
} from "../../types/types";

interface IReqData {
  email: string;
  password: string;
}

interface IPayload {
  tokens: TokensType;
  user: UserWithoutPassordType;
}

export const loginUserController = asyncHandler(
  async (
    req: Request<unknown, unknown, IReqData>,
    res: ResponseWithBody<IPayload>,
  ) => {
    const reqData = req.body;

    const foundUser = await UserService.getOneByEmail(reqData.email, {
      withPassword: true,
    });

    if (!foundUser) {
      throw createError(404, "User not found");
    }

    const hashedPassord = hashingPassword(reqData.password);

    if (hashedPassord !== foundUser.password) {
      throw createError(400, "incorrect password");
    }

    res.status(200).send({
      payload: {
        tokens: {
          accessToken: tokenService.generateAccessToken(foundUser.id),
          refreshToken: tokenService.generateRefreshToken(foundUser.id),
        },
        user: {
          id: foundUser.id,
          fullName: foundUser.fullName,
          email: foundUser.email,
          dayOfBirthday: foundUser.dayOfBirthday,
        },
      },
      message: "Success",
    });
  },
);
