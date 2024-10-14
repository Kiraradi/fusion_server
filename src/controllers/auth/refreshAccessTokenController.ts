import { NextFunction, Request } from "express";
import tokenService from "../../services/tokenService";
import UserService from "../../database/repositories/userRepository";
import { ResponseWithBody, TokensType } from "../../types/types";
import { CustomError } from "../../services/customError";

interface IRequestBoby {
  refreshToken: string;
}

export const refreshAccessTokenController = async (
  req: Request<unknown, unknown, IRequestBoby>,
  res: ResponseWithBody<TokensType>,
  next: NextFunction,
) => {
  try {
    const refreshToken = req.body.refreshToken;

    const id = tokenService.verifyRefreshToken(refreshToken);

    if (!id) {
      throw new CustomError(400, "invalid token");
    }

    const user = await UserService.getOneById(id);

    if (!user) {
      throw new CustomError(400, "User not find");
    }

    const newAccessToken = tokenService.generateAccessToken(user.id);
    const newRefreshToken = tokenService.generateRefreshToken(user.id);

    res.status(200).send({
      payload: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      },
      message: "",
    });
  } catch (error) {
    next(error);
  }
};
