import { DeepPartial, FindOneOptions } from "typeorm";
import { AppDataSource } from "../dataSource";
import { User } from "../entitys/User";

export const userRepository = AppDataSource.getRepository(User);

export const getAll = () => {
    return userRepository.find();
}

export const getOneById = (id: number) => {
    return userRepository.findOneBy({ id });
}

export const getOneByEmail = async (email: string, options?: {
    shouldThrowError?: boolean;
    withPassword?: boolean;
}) => {
    const findOptions: FindOneOptions<User> = {
        where: { email }
    };
    if (options && options.withPassword) {
        findOptions.select = {
            id: true,
            fullName: true,
            email: true,
            password: true,
            dayOfBirthday: true,
        }
    }
    const user = await userRepository.findOne(findOptions);
    if (!user && options && options.shouldThrowError) {
        throw new Error();
    }

    return user;
}

export const getOneByEmailWithPassword = (email: string) => {
    return userRepository.findOne({
        where: { email },
        select: ['id', 'fullName','email','password', 'dayOfBirthday']
    });
}

export const save = (user: User) => {
    return userRepository.save(user);
}

export const update = (id: number, data: DeepPartial<User>) => {
    return userRepository.update(id, data);
}

export default {
    getAll,
    getOneById,
    getOneByEmail,
    getOneByEmailWithPassword,
    save,
    update,
}