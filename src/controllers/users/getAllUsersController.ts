import { Response, Request } from "express";
import { getAllUsers } from "../../database/repositories/userRepository";


export const getAllUsersController = async (req: Request, res: Response) => {
    try {
        const allUsers = await getAllUsers();

        res.send(allUsers);
        
    } catch (error) {
        res.status(500).send(error)
    }

}