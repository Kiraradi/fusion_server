import { NextFunction, Request } from "express";
import { AnyObject, ObjectSchema, Schema, ValidationError } from "yup";
import { ResponseWithBody } from "../types/types";
import { CustomError } from "../services/customError";

export const validateRequestBody =
  (schema: ObjectSchema<AnyObject>) =>
  async (req: Request, res: ResponseWithBody<unknown>, next: NextFunction) => {
    try {
      await schema
        .noUnknown(true, "Unknown fields were passed in the request")
        .validate(
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
