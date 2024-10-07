import { Response } from "express"
import { userRepository } from "../../database/repositories/userRepository"
import { IMyRequest } from "../../types/types"


export const getUserController = async (req: IMyRequest, res: Response) => {
    const userId = Number(req.body.id);

    if(!userId) {
        res.status(500).send('invelif id');
    }

    const foundUser = await userRepository.findOneBy({
        id: userId
    });

    if(!foundUser) {
        res.status(403).send('user not find');
        return;
    }

    res.status(200).send(
        {
            foundUser: {
                id: foundUser.id,
                fullName: foundUser.fullName,
                email: foundUser.email,
                dayOfBirthday: foundUser.dayOfBirthday
            }
        }
    );

}