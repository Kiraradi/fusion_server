import { NextFunction, Request } from "express";
import { Schema, ValidationError } from "yup";
import { ResponseWithBody } from "../types/types";
import { CustomError } from "../services/customError";

export const validateRequestBody =
  (schema: Schema) =>
  async (req: Request, res: ResponseWithBody<unknown>, next: NextFunction) => {
    try {
      await schema.validate(
        {
          ...req.body,
        },
        { abortEarly: false, strict: false, stripUnknown: false },
      );

      next();
    } catch (err) {
      const yupErr = err as ValidationError;

      const error = new CustomError(400, yupErr.errors.join("/"));
      next(error);
    }
  };
