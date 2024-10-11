import { Request } from "express";
import tokenService from "../../services/tokenService";
import UserService from "../../database/repositories/userRepository";
import { ResponseWithBody, TokensType } from "../../types/types";

interface IRequestBoby {
  refreshToken: string;
}

export const refreshAccessTokenController = async (
  req: Request<unknown, unknown, IRequestBoby>,
  res: ResponseWithBody<TokensType>,
) => {
  try {
    const refreshToken = req.body.refreshToken;

    const id = tokenService.verifyRefreshToken(refreshToken);

    if (!id) {
      res.status(400).send({ message: "invalid token" });
      return;
    }

    const user = await UserService.getOneById(id);

    if (!user) {
      res.status(404).send({ message: "User not find" });
      return;
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
    res.status(500).send({ message: `${error}` });
  }
};
