import dotenv from 'dotenv';
import {sign} from 'jsonwebtoken';

dotenv.config();

const tokenSecret = process.env.TOKEN_SECRET as string;

export const generateAccsesToken = (userId:number) : string => {
    console.log(process.env.TOKEN_SECRET)
    return sign({userId}, process.env.TOKEN_SECRET as string, {expiresIn: '1800s'});
}