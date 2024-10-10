import { Request, Response } from "express";
import UserService from '../../database/repositories/userRepository';

export const deleteUserController = async (req: Request, res: Response) => {
  try {

    if (!req.user) {
      res.status(404).send('User not find');
      return;
    }

    const result = await UserService.deleteUser(req.user.id);
    
    res.status(200).send(result);

  } catch (error) {
    res.status(500).send(`${error}`);
  }
}