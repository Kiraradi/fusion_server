import { userRepository } from "../../database/repositories/userRepository";
import { generateAccsesToken } from "../../services/generateAccsesToken";
import { IMyRequest, IUserData } from "../../types/types";
import { Response } from "express";


export const registrationUserController = async (req: IMyRequest, res: Response) => {
    const userData: IUserData = req.body;
    if (!userData.email) {
        res.status(400).send('Error adding user');
        return;
    }

    const newUser = await userRepository.save(userData);

    
    if (!newUser.id) {
        res.sendStatus(500);
        return;
    }

    res.send({
        token: generateAccsesToken(newUser.id)
    });
}