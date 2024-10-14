import { NextFunction, Request } from "express";
import tokenService from "../../services/tokenService";
import {
  ResponseWithBody,
  TokensType,
  UserFromRequest,
} from "../../types/types";

interface IReqData {
  email?: string;
  password: string;
}

interface IPayload {
  tokens: TokensType;
  user: UserFromRequest;
}

export const loginUserController = async (
  req: Request<unknown, unknown, IReqData>,
  res: ResponseWithBody<IPayload>,
  next: NextFunction,
) => {
  try {
    const foundUser = req.user;

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
  } catch (error) {
    next(error);
  }
};
