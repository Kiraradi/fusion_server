import { Request, NextFunction } from "express";
import tokenService from "../../services/TokenService";
import {
  ResponseWithBody,
  TokensType,
  UserFromRequest,
} from "../../types/types";

interface IPayload {
  tokens: TokensType;
  user: UserFromRequest;
}
export const getMeController = async (
  req: Request,
  res: ResponseWithBody<IPayload>,
  next: NextFunction,
) => {
  try {
    const user = req.user;
    res.status(200).send({
      payload: {
        tokens: {
          accessToken: tokenService.generateAccessToken(user.id),
          refreshToken: tokenService.generateRefreshToken(user.id),
        },
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          avatar: user.avatar,
        },
      },
      message: "Success",
    });
  } catch (error) {
    next(error);
  }
};
