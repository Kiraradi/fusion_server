import UserRepository from "../database/repositories/userRepository";
import { hashPassword } from "./hashPassword";
import { User } from "../database/entitys/User";
import { CustomError } from "./customError";
import { DeepPartial } from "typeorm";

const registrationUser = async (args: User) => {
  const isEmainInDatabase = await UserRepository.getOneByEmail(args.email);

  if (isEmainInDatabase) {
    throw new CustomError(404, "email is busy");
  }
  const hashedPassword = hashPassword(args.password);

  const user = {
    ...args,
    password: hashedPassword,
  };

  return UserRepository.save(user);
};

const loginUser = async (email: string, password: string) => {
  const user = await UserRepository.getOneByEmail(email, {
    withPassword: true,
  });

  if (!user) {
    throw new CustomError(404, "user not find");
  }

  const hashedPassword = hashPassword(password);

  if (hashedPassword !== user.password) {
    throw new CustomError(400, "password invalid");
  }

  return user;
};

const getUserById = async (userId: number) => {
  const user = await UserRepository.getOneById(userId);

  if (!user) {
    throw new CustomError(404, "user not find");
  }

  return user;
};

interface Idata {
  fullName?: string;
  email?: string;
  dayOfBirthday?: string;
}

const editUser = async (data: Idata, userId: number) => {
  if (Object.keys(data).length === 0) {
    throw new CustomError(404, "no new parameters found");
  }

  const { email, ...rest } = data;

  const dataToUpdate: DeepPartial<User> = rest;

  if (email) {
    const isEmailBusy = await UserRepository.getOneByEmail(email);

    if (isEmailBusy) {
      throw new CustomError(400, "email is busy");
    }

    dataToUpdate.email = email;
  }
  await UserRepository.update(userId, dataToUpdate);

  const updatedUser = await UserRepository.getOneById(userId);

  if (!updatedUser) {
    throw new CustomError(404, "user not find");
  }

  return updatedUser;
};

const editPassword = async (
  password: string,
  newPassword: string,
  email: string,
) => {
  const user = await UserRepository.getOneByEmail(email, {
    withPassword: true,
  });

  if (!user) {
    throw new CustomError(404, "user not find");
  }
  const hashOldPassword = hashPassword(password);

  if (user.password !== hashOldPassword) {
    throw new CustomError(400, "password invalid");
  }

  const hashNewPassword = hashPassword(newPassword);
  const userWithNewPassword = { ...user, password: hashNewPassword };

  await UserRepository.update(userWithNewPassword.id, userWithNewPassword);
};

export default {
  registrationUser,
  loginUser,
  getUserById,
  editUser,
  editPassword,
};
