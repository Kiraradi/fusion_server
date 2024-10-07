import { Response } from "express";
import { IMyRequest } from "../../types/types";
import { hashPassword } from "../../services/hashPassword";
import { userRepository } from "../../database/repositories/userRepository";
import { generateAccsesToken } from "../../services/generateAccsesToken";

interface IReqData {
    email: string
    password: string
}

export const loginUserController = async (req: IMyRequest, res: Response) => {
    try {
        const reqData: IReqData = req.body;

        const foundUser = await userRepository.findOneBy({
            email: reqData.email
        })

        if (!foundUser) {
            res.status(403).send('User not found');
            return;
        }

        hashPassword(reqData.password, (hash) => {
            if (hash !== foundUser.password) {
                res.status(400).send('incorrect password');
                return
            }


            res.status(200).send({
                token: generateAccsesToken(foundUser.id)
            });

        })
    } catch (error) {
        res.status(500).send(error)
    }








}