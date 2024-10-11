import { Response } from "express";
import { User } from "../database/entitys/User";

export type UserWithoutPassordType = Omit<User, "password">;

export type ResponseBodyType<T> = {
  payload?: T;
  message: string;
  meta?: unknown;
};

export type ResponseWithBody<T> = Response<ResponseBodyType<T>>;

export type TokensType = {
  accessToken: string;
  refreshToken: string;
};
