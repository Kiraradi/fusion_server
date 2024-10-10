import { Response, Request } from "express";
import { getAll } from "../../database/repositories/userRepository";

export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const allUsers = await getAll();

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
};
