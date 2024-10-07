import dotenv from 'dotenv';
import {sign} from 'jsonwebtoken';

dotenv.config();

export const generateAccsesToken = (userId:number) : string => {
    return sign({userId}, process.env.TOKEN_SECRET as string, {expiresIn: '1800s'});
}