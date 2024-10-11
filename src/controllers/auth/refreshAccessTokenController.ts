import { Request } from "express";
import tokenService from "../../services/tokenService";
import UserService from "../../database/repositories/userRepository";
import { ResponseWithBody, TokensType } from "../../types/types";
import asyncHandler from "express-async-handler";
import createError from "http-errors";

interface IRequestBoby {
  refreshToken: string;
}

export const refreshAccessTokenController = asyncHandler(
  async (
    req: Request<unknown, unknown, IRequestBoby>,
    res: ResponseWithBody<TokensType>,
  ) => {
    const refreshToken = req.body.refreshToken;

    const id = tokenService.verifyRefreshToken(refreshToken);

    if (!id) {
      throw createError(400, "invalid token");
    }

    const user = await UserService.getOneById(id);

    if (!user) {
      throw createError(404, "User not find");
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
  },
);
