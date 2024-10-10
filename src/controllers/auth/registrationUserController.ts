import UserService from "../../database/repositories/userRepository";
import { generateAccessToken } from "../../services/accessTokenService";
import { Response, Request} from "express";
import { hashingPassword } from "../../services/hashPassword";
import { User } from "../../database/entitys/User";

export const registrationUserController = async (req: Request<{}, {}, User>, res: Response) => {
    try {
        const userData = req.body;
        const isEmainInDatabase = await UserService.getOneByEmail(userData.email);
    
        if (isEmainInDatabase) {
            res.status(404).send('email is busy');
            return;
        }
    
        const hashedPassword = hashingPassword(userData.password);
    
        const userWithHash = {
            ...userData,
            password: hashedPassword
        }
    
        const user = await UserService.save(userWithHash);
    
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