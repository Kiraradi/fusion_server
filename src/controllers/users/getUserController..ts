import { Response } from "express"
import { getOneById } from "../../database/repositories/userRepository"
import { IMyRequest } from "../../types/types"

export const getUserController = async (req: IMyRequest, res: Response) => {
    const userId = Number(req.body.id);

    if(!userId) {
        res.status(404).send('id not find');
    }

    const user = await getOneById(userId);

    if(!user) {
        res.status(404).send('user not find');
        return;
    }

    res.status(200).send(user);

}