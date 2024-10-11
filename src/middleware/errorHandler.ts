import { NextFunction, Request } from "express";
import { ICustomException, ResponseWithBody } from "../types/types";

export const errorHandler = (
  error: ICustomException,
  req: Request,
  res: ResponseWithBody<unknown>,
  next: NextFunction,
) => {
  res.status(error.status || 500).send({
    message: error.message,
  });
  next();
};
