import { Response, Request } from "express";
import { IUserData } from "../../types/types";

export const editUserController = (req: Request, res: Response) => {
    const newDataOfUser: Partial<IUserData> = req.body;

}