import { AppDataSource } from "../dataSource";
import { User } from "../entitys/User";

export const userRepository = AppDataSource.getRepository(User);