import { Response, Request } from "express";
import UserService from '../../database/repositories/userRepository';
import { hashingPassword } from "../../services/hashPassword";

interface IRequestBody {
  oldPassword: string
  newPassword: string
}
export const editPasswordController = async (req: Request<{}, {}, IRequestBody>, res: Response) => {
  try {

    const { oldPassword, newPassword } = req.body;

    const user = await UserService.getOneByEmail(req.user.email, { withPassword: true });

    const hashOldPassword = hashingPassword(oldPassword);

    if (hashOldPassword !== user?.password) {
      res.status(400).send('invalid password');
      return;
    }

    if (oldPassword === newPassword) {
      res.status(400).send('The old and new passwords must not match');
      return;
    }

    const hashNewPassword = hashingPassword(newPassword);
    const userWithNewPassword = { ...user, password: hashNewPassword };

    await UserService.update(userWithNewPassword.id, userWithNewPassword);

    res.status(200).send('The password has been successfully changed');

  } catch (error) {
    res.status(500).send(`${error}`);
  }

}