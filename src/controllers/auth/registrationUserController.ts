import { getOneByEmail, seveUser } from "../../database/repositories/userRepository";
import { generateAccessToken } from "../../services/accessTokenService";
import { IMyRequest, IUserData } from "../../types/types";
import { Response } from "express";
import { hashingPassword } from "../../services/hashPassword";


export const registrationUserController = async (req: IMyRequest, res: Response) => {
    try {
        const userData = req.body;

        const isEmainInDatabase = await getOneByEmail(userData.email );
    
        if (isEmainInDatabase) {
            res.status(404).send('email is busy');
            return;
        }
    
        const hashedPassword = hashingPassword(userData.password);
    
        const userWithHash = {
            ...userData,
            password: hashedPassword
        }
    
        const user = await seveUser(userWithHash);
    
    
        if (!user.id) {
            res.sendStatus(500);
            return;
        }
    
        res.send({
            token: generateAccessToken(user.id),
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                dayOfBirthday: user.dayOfBirthday
            }
        }); 
    } catch (error) {
        res.status(500).send(`${error}`)
    }


}