import { Response } from "express";
import { IMyRequest } from "../../types/types";
import { userRepository } from "../../database/repositories/userRepository";


export const getAllUsersController = async (req: IMyRequest, res: Response) => {
    try {

        const AllUsers = await userRepository.find();

        res.send(AllUsers);
    } catch (error) {
        res.status(500).send(error)
    }

}