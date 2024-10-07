import { Response } from "express";
import { IMyRequest } from "../../types/types";
import { userRepository } from "../../database/repositories/userRepository";


export const getAllUsersController = async (req: IMyRequest, res: Response) => {
    try {
        const allUsers = await userRepository.find();

        const usersWithoutPasswords = allUsers.map(user => {
            return {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                dayOfBirthday: user.dayOfBirthday
            }
        })

        res.send(usersWithoutPasswords);
        
    } catch (error) {
        res.status(500).send(error)
    }

}