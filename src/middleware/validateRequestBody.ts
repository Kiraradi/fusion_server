import { NextFunction, Request } from "express";
import * as yup from "yup";
import { ResponseWithBody } from "../types/types";
import { CustomError } from "../services/ErrorService";

type ValidationSchemasType =
  | yup.StringSchema
  | yup.NumberSchema
  | yup.BooleanSchema;

type SchemaItemType = Record<string, ValidationSchemasType>;

export type SchemaShape = {
  params?: SchemaItemType;
  body?: SchemaItemType;
  query?: SchemaItemType;
};

export const validateRequestBody =
  (schema: SchemaShape) =>
  async (
    req: Request<object>,
    res: ResponseWithBody<unknown>,
    next: NextFunction,
  ) => {
    try {
      const customSchema: yup.ObjectShape = {};

      for (const key in schema) {
        if (key) {
          customSchema[key] = yup
            .object()
            .shape(schema[key as keyof typeof schema] as SchemaItemType)
            .noUnknown(true, "Unknown fields were passed in the request");
        }
      }

      const shapeTemplate = yup.object().shape(customSchema);

      await shapeTemplate.validate(
        req,

        { abortEarly: false, strict: false, stripUnknown: false },
      );

      next();
    } catch (err) {
      const yupErr = err as yup.ValidationError;

      const error = new CustomError(400, yupErr.errors.join("/"));
      next(error);
    }
  };
