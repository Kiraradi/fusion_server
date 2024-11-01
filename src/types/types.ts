import { Response } from "express";
import { User } from "../database/entities/User";

export type UserFromRequest = Omit<User, "password">;

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

export type GenresType = "Fantasy" | "Travel" | "Autobiography";
