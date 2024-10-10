import { Response, Request } from "express";
import { hashingPassword} from "../../services/hashPassword";
import { getOneByEmailWithPassword } from "../../database/repositories/userRepository";
import { generateAccessToken } from "../../services/accessTokenService";

interface IReqData {
    email: string
    password: string
}

export const loginUserController = async (req: Request<{}, {}, IReqData>, res: Response) => {
    try {
        const reqData = req.body;

        console.log(reqData)

        const foundUser = await getOneByEmailWithPassword(reqData.email);

        if (!foundUser) {
            res.status(404).send('User not found');
            return;
        }

        const hashedPassord = hashingPassword(reqData.password);

        if (hashedPassord !== foundUser.password) {
            res.status(400).send('incorrect password');
            return
        }


        res.status(200).send({
            token: generateAccessToken(foundUser.id),
            user: {
                id: foundUser.id,
                fullName: foundUser.fullName,
                email: foundUser.email,
                dayOfBirthday: foundUser.dayOfBirthday
            }
        });


    } catch (error) {
        res.status(500).send(error)
    }








}