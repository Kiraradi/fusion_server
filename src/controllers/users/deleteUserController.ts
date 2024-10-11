import { Request } from "express";
import UserService from "../../database/repositories/userRepository";
import { ResponseWithBody } from "../../types/types";

export const deleteUserController = async (
  req: Request,
  res: ResponseWithBody<unknown>,
) => {
  try {
    const result = await UserService.deleteUser(req.user.id);

    if (result.affected !== 1) {
      throw new Error("The number of deleted rows is not equal to 1");
    }

    res.status(200).send({ message: "user deleted" });
  } catch (error) {
    res.status(500).send({ message: `${error}` });
  }
};
