import UserRepository from "../database/repositories/userRepository";
import { hashPassword } from "../utils/hashPassword";
import { User } from "../database/entitys/User";
import { CustomError } from "./customError";

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
    throw new CustomError(404, "user not found");
  }

  const hashedPassword = hashPassword(password);

  if (hashedPassword !== user.password) {
    throw new CustomError(400, "password invalid");
  }

  return user;
};

export default {
  registrationUser,
  loginUser,
};
