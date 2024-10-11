import { Response, NextFunction, Request } from "express";
import UserService from "../database/repositories/userRepository";
import tokenService from "../services/tokenService";

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      res.sendStatus(401);
      return;
    }

    const id = tokenService.verifyAccessToken(token);

    if (!id) {
      res.status(401).send("Token verification error");
      return;
    }

    const user = await UserService.getOneById(id);

    if (!user) {
      res.status(404).send("User not find");
      return;
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(500).send(error);
  }
};
