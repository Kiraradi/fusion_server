import UserService from "../../database/repositories/userRepository";
import tokenService from "../../services/tokenService";
import { Response, Request } from "express";
import { hashingPassword } from "../../services/hashingPassword";
import { User } from "../../database/entitys/User";

export const registrationUserController = async (
  req: Request<unknown, unknown, User>,
  res: Response,
) => {
  try {
    const userData = req.body;
    const isEmainInDatabase = await UserService.getOneByEmail(userData.email);

    if (isEmainInDatabase) {
      res.status(404).send("email is busy");
      return;
    }

    const hashedPassword = hashingPassword(userData.password);

    const userWithHash = {
      ...userData,
      password: hashedPassword,
    };

    const user = await UserService.save(userWithHash);

    res.send({
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
    });
  } catch (error) {
    res.status(500).send(`${error}`);
  }
};
