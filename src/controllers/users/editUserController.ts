import { Response, Request } from "express";
import UserService from '../../database/repositories/userRepository';
import { DeepPartial } from "typeorm";
import { User } from "../../database/entitys/User";

interface IRequestBody {
    fullName?: string
    email?: string
    dayOfBirthday?: string
}

export const editUserController = async (req: Request<{}, {}, IRequestBody>, res: Response) => {
    try {
        const newDataOfUser = req.body;

        if (Object.keys(newDataOfUser).length === 0) {
            res.status(404).send('no new parameters found');
        }
        
        if(!req.user) {
            res.status(404).send('User not finded');
            return;
        }
        
        const user = { ...req.user };

        const { email, ...rest } = req.body;

        const dataToUpdate: DeepPartial<User> = rest;

    
        if (email) {            
            const isEmailBusy = await UserService.getOneByEmail(email);
        
            if (isEmailBusy) {
                res.status(400).send('email is busy');
                return;                 
            }
        }

        dataToUpdate.email = email;
        
        await UserService.update(user.id, dataToUpdate);

        const updatedUser = await UserService.getOneById(user.id);

        res.status(200).send({ user: updatedUser });

    } catch (error) {
        res.status(500).send('Error')
    }
}