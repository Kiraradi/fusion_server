import { Request, Response } from "express";
import tokenService from "../../services/tokenService";
import UserService from "../../database/repositories/userRepository";

interface IRequestBoby {
  refreshToken: string;
}

export const refreshAccessTokenController = async (
  req: Request<unknown, unknown, IRequestBoby>,
  res: Response,
) => {
  try {
    const refreshToken = req.body.refreshToken;

    const id = tokenService.verifyRefreshToken(refreshToken);

    if (!id) {
      res.status(400).send("invalid token");
      return;
    }

    const user = await UserService.getOneById(id);

    if (!user) {
      res.status(404).send("User not find");
      return;
    }

    const newAccessToken = tokenService.generateAccessToken(user.id);
    const newRefreshToken = tokenService.generateRefreshToken(user.id);

    res.status(200).send({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    res.status(500).send(`${error}`);
  }
};
