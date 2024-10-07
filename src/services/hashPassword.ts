import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();
 

export const hashPassword = (
    passowd: string, 
    callback: (hash:string) => void
    ) => {
    crypto.pbkdf2(
        passowd,
        process.env.TOKEN_SECRET as string,
        Number(process.env.SERVER_HASH_ITERATIONS),
        Number(process.env.SERVER_HASH_BYTES),
        process.env.SERVER_HASH_DIGEST as string,
        (err, deriveKey) => {
            if (err) {
                throw err;
            }
            callback(deriveKey.toString('hex'));
        }
    ) 
}