import { Request } from "express";
import { User } from "../database/entitys/User";


export interface IUserData {
    fullName: string
    email: string
    password: string
    dayOfBirthday: string
}

export interface IUser extends IUserData{
    id: number
}

export interface IUserWithoutPassord extends Omit<IUser, 'password'> {

}

// export type SignUpRequestBodyType = Pick<User, ['']>