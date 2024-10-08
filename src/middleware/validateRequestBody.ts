import { NextFunction, Response, Request } from "express";
import { Schema } from "yup";

export interface IValidateError {
    path: string
}

export const validateRequestBody = (schema: Schema) => async(req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.validate({
            ...req.body
        })
        
        next();

    } catch (err) {
        const error = err as IValidateError;
        res.status(400).send(`invalid ${error.path}`);
    }
}