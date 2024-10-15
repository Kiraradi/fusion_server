import tokenService from "../../services/TokenService";
import { NextFunction, Request } from "express";
import { User } from "../../database/entitys/User";
import {
  TokensType,
  UserFromRequest,
  ResponseWithBody,
} from "../../types/types";
import AuthService from "../../services/AuthService";

interface IPayload {
  tokens: TokensType;
  user: UserFromRequest;
}

export const registrationUserController = async (
  req: Request<unknown, unknown, User>,
  res: ResponseWithBody<IPayload>,
  next: NextFunction,
) => {
  try {
    const userData = req.body;

    const user = await AuthService.registrationUser(userData);

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
          address: "",
        },
      },
      message: "Success",
    });
  } catch (error) {
    next(error);
  }
};
