import { NextFunction, Request } from "express";
import { Schema, ValidationError } from "yup";
import { ResponseWithBody } from "../types/types";
import asyncHandler from "express-async-handler";
import createError from "http-errors";

export interface IValidateError {
  path: string;
}

export const validateRequestBody = (schema: Schema) =>
  asyncHandler(
    async (
      req: Request,
      res: ResponseWithBody<unknown>,
      next: NextFunction,
    ) => {
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
        throw createError(400, `${error.errors}`);
      }
    },
  );
