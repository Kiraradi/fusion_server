import { NextFunction, Request } from "express";
import tokenService from "../../services/TokenService";
import {
  ResponseWithBody,
  TokensType,
  UserFromRequest,
} from "../../types/types";
import AuthService from "../../services/AuthService";

interface IReqData {
  email: string;
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
    const { email, password } = req.body;
    const user = await AuthService.loginUser(email, password);

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
        },
      },
      message: "Success",
    });
  } catch (error) {
    next(error);
  }
};
