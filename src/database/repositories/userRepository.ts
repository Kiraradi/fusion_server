import { AppDataSource } from "../dataSource";
import { User } from "../entitys/User";

export const userRepository = AppDataSource.getRepository(User);

const getOneById = (id: number) => {
    return userRepository.findOneBy({ id });
}