import { NextFunction, Response } from "express";
import { IMyRequest } from "../types/types";
import { Schema } from "yup";

export interface IValidateError {
    path: string
}

export const validateRequestBody = (schema: Schema) => async(req: IMyRequest, res: Response, next: NextFunction) => {
    try {
        await schema.validate({
            ...req.body
        })
        next()
    } catch (err) {
        const error = err as IValidateError;
        res.status(400).send(`invalid ${error.path}`);
    }
}