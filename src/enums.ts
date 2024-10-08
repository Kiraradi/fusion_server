import { User } from "./database/entitys/User"

export enum USER_OBJECT_KEYS {
    id = "id",
    fullName = 'fullName',
    email = 'email',
    password = 'password',
    dayOfBirthday = 'dayOfBirthday',
}

export type UserKeysType = keyof User;
