import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../database/dataSource";


export const getAllUsersController = (req: Request, res: Response) => {
    console.table(req.userId)
}