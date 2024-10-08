import { Response, NextFunction, Request } from "express";
import { getOneById } from "../database/repositories/userRepository";
import { verifyAccessToken } from "../services/accessTokenService";


export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            res.sendStatus(401);
            return;
        }

        const id = verifyAccessToken(token);

        if (!id) {
            res.status(401).send('Token verification error');
            return;
        }

        const user = await getOneById(id);

        if(!user) {
            res.status(404).send('User not finded');
            return;
        }

        req.user = user;

        next();

    } catch (error) {
        res.status(500).send(error);
    }
}