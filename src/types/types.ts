import { User } from "../database/entitys/User";


export type UserWithoutPassordType = Omit<User, 'password'> 