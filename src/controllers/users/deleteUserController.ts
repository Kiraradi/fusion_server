import { Request, Response } from "express";
import UserService from '../../database/repositories/userRepository';

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const result = await UserService.deleteUser(req.user.id);
    
    res.status(200).send(result);

  } catch (error) {
    res.status(500).send(`${error}`);
  }
}