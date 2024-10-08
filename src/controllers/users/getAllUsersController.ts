import { Response } from "express";
import { IMyRequest } from "../../types/types";
import { getAllUsers } from "../../database/repositories/userRepository";


export const getAllUsersController = async (req: IMyRequest, res: Response) => {
    try {
        const allUsers = await getAllUsers();

        res.send(allUsers);
        
    } catch (error) {
        res.status(500).send(error)
    }

}