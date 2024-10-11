import { NextFunction, Request } from "express";
import UserService from "../database/repositories/userRepository";
import tokenService from "../services/tokenService";
import { ResponseWithBody } from "../types/types";
import asyncHandler from "express-async-handler";
import createError from "http-errors";

export const authenticateToken = asyncHandler(
  async (req: Request, res: ResponseWithBody<unknown>, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      throw createError(401, "token not find");
    }

    const id = tokenService.verifyAccessToken(token);

    if (!id) {
      throw createError(401, "Token verification error");
    }

    const user = await UserService.getOneById(id);

    if (!user) {
      throw createError(404, "User not find");
    }

    req.user = user;

    next();
  },
);
