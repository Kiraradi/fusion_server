import { Response } from "express";
import { IMyRequest, IUserData } from "../../types/types";

export const editUserController = (req: IMyRequest, res: Response) => {
    const newDataOfUser: Partial<IUserData> = req.body;

}