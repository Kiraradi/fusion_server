import { Response, Request, RequestHandler } from "express";
import UserService from '../../database/repositories/userRepository';
import { USER_OBJECT_KEYS } from "../../enums";
import { getOneByEmail } from "../../database/repositories/userRepository";
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
            // check something
            const isEmailAvailable = true;
            if (isEmailAvailable) {
                dataToUpdate.email = email; 
            }
        }
        
        await UserService.update(user.id, req.body);

        const updatedUser = await UserService.getOneById(user.id);

        res.status(200).send({ user: updatedUser })
    } catch (error) {

    }
}