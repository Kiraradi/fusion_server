import { UserWithoutPassordType } from "../types";

export {};

declare global {
  namespace Express {
    export interface Request {
      user: UserWithoutPassordType;
    }
  }
}
