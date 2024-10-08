import { IUserData } from "../../types/types";
import { AppDataSource } from "../dataSource";
import { User } from "../entitys/User";

export const userRepository = AppDataSource.getRepository(User);

export const getAllUsers = () => {
    return userRepository.find();
}

export const getOneById = (id: number) => {
    return userRepository.findOneBy({ id });
}

export const getOneByEmail = (email: string) => {
    return userRepository.findOneBy({ email });
}

export const getOneByEmailWithPassword = (email: string) => {
    return userRepository.findOne({
        where:{email: email},
        select:['id', 'fullName','email','password', 'dayOfBirthday']
    });
}

export const seveUser = (user: IUserData) => {
    return userRepository.save(user);
}