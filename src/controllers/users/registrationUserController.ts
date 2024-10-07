import { userRepository } from "../../database/repositories/userRepository";
import { generateAccsesToken } from "../../services/generateAccsesToken";
import { IMyRequest, IUserData } from "../../types/types";
import { Response } from "express";
import { hashPassword } from "../../services/hashPassword";


export const registrationUserController = async (req: IMyRequest, res: Response) => {
    const userData: IUserData = req.body;

    const isEmainInDatabase = await userRepository.findOneBy({ email: userData.email });

    if (isEmainInDatabase) {
        res.status(400).send('email is busy');
        return;
    }

    hashPassword(userData.password, async (hash) => {
        const userWithHash = {
            ...userData,
            password: hash
        }

        const newUser = await userRepository.save(userWithHash);


        if (!newUser.id) {
            res.sendStatus(500);
            return;
        }

        res.send({
            token: generateAccsesToken(newUser.id)
        });

    })


}