import { Request } from "express";


export interface IUserData {
    fullName: string
    email: string
    password: string
    dayOfBirthday: string
}

export interface IUser extends IUserData{
    id: number
}