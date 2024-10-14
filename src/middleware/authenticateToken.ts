import { NextFunction, Request } from "express";
import UserService from "../database/repositories/userRepository";
import tokenService from "../services/tokenService";
import { ResponseWithBody } from "../types/types";
import { CustomError } from "../services/customError";

export const authenticateToken = async (
  req: Request,
  res: ResponseWithBody<unknown>,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      throw new CustomError(401, "token not find");
    }

    const id = tokenService.verifyAccessToken(token);

    if (!id) {
      throw new CustomError(401, "Token verification error");
    }

    const user = await UserService.getOneById(id);

    if (!user) {
      throw new CustomError(404, "User not find");
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
