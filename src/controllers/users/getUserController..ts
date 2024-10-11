import { Request } from "express";
import UserService from "../../database/repositories/userRepository";
import { ResponseWithBody } from "../../types/types";
import { User } from "../../database/entitys/User";

interface IQuery {
  id: string;
}

export const getUserController = async (
  req: Request<unknown, unknown, unknown, IQuery>,
  res: ResponseWithBody<User>,
) => {
  try {
    const userId = Number(req.query.id);

    if (!userId) {
      res.status(404).send({ message: "id not find" });
    }

    const user = await UserService.getOneById(userId);

    if (!user) {
      res.status(404).send({ message: "user not find" });
      return;
    }

    res.status(200).send({
      payload: user,
      message: "Success",
    });
  } catch (error) {
    res.status(500).send({ message: `${error}` });
  }
};
