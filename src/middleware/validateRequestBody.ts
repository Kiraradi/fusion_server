import { NextFunction, Request } from "express";
import { AnyObject, ObjectSchema, ValidationError } from "yup";
import { ResponseWithBody } from "../types/types";
import { CustomError } from "../services/ErrorService";

export const validateRequestBody =
  (schema: ObjectSchema<AnyObject>) =>
  async (
    req: Request<object>,
    res: ResponseWithBody<unknown>,
    next: NextFunction,
  ) => {
    try {
      await schema
        .noUnknown(true, "Unknown fields were passed in the request")
        .validate(
          {
            ...req.body,
            ...req.params,
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
