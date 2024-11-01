import { Request, NextFunction } from "express";
import { ResponseWithBody } from "../../types/types";
import FileService from "../../services/FileService";
import UserService from "../../services/UserService";
import { User } from "../../database/entities/User";

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
    const avatarPath = await FileService.save(baseImg, extension);
    const oldAvatarPath = user.avatar;

    const updatedUser = await UserService.saveAvatar(
      { avatar: avatarPath },
      user.id,
    );
    // IMG ent
    // проверка на картинку
    if (oldAvatarPath) {
      FileService.deleteFile(oldAvatarPath);
    }

    res.status(200).send({ payload: { user: updatedUser }, message: "save" });
  } catch (error) {
    console.log("saveAvatarController ERROR ===>");
    next(error);
  }
};
