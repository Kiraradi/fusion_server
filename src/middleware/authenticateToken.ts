import { Response, NextFunction } from "express";
import { IMyRequest } from "../types/types";
import { verify } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { userRepository } from "../database/repositories/userRepository";

dotenv.config();
const tokenSecret = process.env.TOKEN_SECRET as string;

export const authenticateToken = (req: IMyRequest, res: Response, next: NextFunction): void => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
    
        if (token === null || token === undefined) {
            res.sendStatus(401);
            return
        }
    
        verify(token, tokenSecret, async (err, userId) => {
    
            if(err || userId === undefined || typeof(userId) === 'string') {
                res.status(403).send('Token verification error');
                return;
            };
    
            
            const user = await userRepository.findOneBy({
                id: userId['userId']
            })
    
            req.user = user;
            
            next();
        })
    } catch (error) {
        res.status(500).send(error);
    }


}