import { Response } from "express";
import { User } from "../database/entitys/User";

export type UserFromRequest = Omit<User, "password"> & {
  password?: string;
};

export type ResponseBodyType<T> = {
  payload: T;
  message: string;
  meta?: unknown;
};

export type ResponseWithBody<T> = Response<ResponseBodyType<T>>;

export type TokensType = {
  accessToken: string;
  refreshToken: string;
};

export interface ICustomException extends Error {
  status: number;
  message: string;
}
