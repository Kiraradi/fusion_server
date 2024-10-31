import { Request, NextFunction } from "express";
import { ResponseWithBody } from "../../types/types";
import FileService from "../../../FileService";
import UserService from "../../services/UserService";
import { User } from "../../database/entitys/User";

interface ISaveAvatarController {
  baseImg: string;
  extension: string;
}

interface IPayload {
  user: User | null;
}

export const saveAvatarController = async (
  req: Request<unknown, unknown, ISaveAvatarController>,
  res: ResponseWithBody<IPayload>,
  next: NextFunction,
) => {
  try {
    const { baseImg, extension } = req.body;
    const user = req.user;
    const avatarPath = FileService.save(baseImg, extension);

    const updatedUser = await UserService.saveAvatar(
      { avatar: avatarPath },
      user.id,
    );

    res.status(200).send({ payload: { user: updatedUser }, message: "save" });
  } catch (error) {
    console.log("saveAvatarController ERROR ===>");
    next(error);
  }
};
