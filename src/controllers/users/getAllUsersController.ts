import { Request } from "express";
import { getAll } from "../../database/repositories/userRepository";
import { ResponseWithBody } from "../../types/types";
import { User } from "../../database/entitys/User";

export const getAllUsersController = async (
  req: Request,
  res: ResponseWithBody<User[]>,
) => {
  try {
    const allUsers = await getAll();

    res.status(200).send({
      payload: allUsers,
      message: "Success",
    });
  } catch (error) {
    res.status(500).send({ message: `${error}` });
  }
};
