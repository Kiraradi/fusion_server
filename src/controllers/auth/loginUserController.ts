import { NextFunction, Request } from "express";
import tokenService from "../../services/tokenService";
import UserService from "../../database/repositories/userRepository";
import {
  ResponseWithBody,
  TokensType,
  UserFromRequest,
} from "../../types/types";
import { CustomError } from "../../services/customError";
import { hashingPassword } from "../../services/hashingPassword";

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
    const user = await UserService.getOneByEmail(email, {
      withPassword: true,
    });

    const hashPassword = hashingPassword(password);

    if (!user) {
      throw new CustomError(404, "user not find");
    }

    if (hashPassword !== user.password) {
      throw new CustomError(400, "password invalid");
    }

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
          dayOfBirthday: user.dayOfBirthday,
        },
      },
      message: "Success",
    });
  } catch (error) {
    next(error);
  }
};
