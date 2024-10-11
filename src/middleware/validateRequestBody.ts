import { NextFunction, Request } from "express";
import { Schema, ValidationError } from "yup";
import { ResponseWithBody } from "../types/types";

export interface IValidateError {
  path: string;
}

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
      const error = err as ValidationError;
      res.status(400).send({ message: `${error.errors}` });
    }
  };
