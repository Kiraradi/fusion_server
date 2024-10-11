import { Request } from "express";
import { hashingPassword } from "../../services/hashingPassword";
import UserService from "../../database/repositories/userRepository";
import tokenService from "../../services/tokenService";
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

export const loginUserController = async (
  req: Request<unknown, unknown, IReqData>,
  res: ResponseWithBody<IPayload>,
) => {
  try {
    const reqData = req.body;

    const foundUser = await UserService.getOneByEmail(reqData.email, {
      withPassword: true,
    });

    if (!foundUser) {
      res.status(404).send({ message: "User not found" });
      return;
    }

    const hashedPassord = hashingPassword(reqData.password);

    if (hashedPassord !== foundUser.password) {
      res.status(400).send({ message: "incorrect password" });
      return;
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
  } catch (error) {
    res.status(500).send({ message: `${error}` });
  }
};
