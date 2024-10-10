import { NextFunction, Response, Request } from "express";
import { Schema, ValidationError } from "yup";

export interface IValidateError {
    path: string
}

export const validateRequestBody = (schema: Schema) => async(req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.validate({
            ...req.body
        }, {abortEarly: false, strict: false, stripUnknown: false});
        
        next();

    } catch (err) {
        const error = err as ValidationError;
        res.status(400).send(`${error.errors}`);
    }
}