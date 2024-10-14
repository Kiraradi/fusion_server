import { NextFunction, Request } from "express";
import { ICustomException, ResponseWithBody } from "../types/types";
import { CustomError } from "../services/customError";

export const errorHandler = (
  error: ICustomException,
  req: Request,
  res: ResponseWithBody<null>,
  next: NextFunction,
) => {
  if (error instanceof CustomError) {
    res.status(error.code).send({ payload: null, message: error.message });
  } else {
    res.status(500).send({ payload: null, message: "internal server error" });
  }

  next();
};
