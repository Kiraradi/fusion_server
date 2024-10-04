import { Request, Response, NextFunction } from "express";
import { verify } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const tokenSecret = process.env.TOKEN_SECRET as string;

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token === null || token === undefined) {
        res.sendStatus(401);
        return
    }

    verify(token, tokenSecret, (err, userId) => {

        if(err || userId === undefined || typeof(userId) === 'string') {
            return res.sendStatus(403);
        };

        req.userId = userId['userId'];
        console.log('+++++>')
        next();
    })

}