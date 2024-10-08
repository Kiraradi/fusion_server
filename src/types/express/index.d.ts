import { IUserWithoutPassord } from "../types";

export {};

declare global {
    namespace Express {
        export interface Request {
            user?: IUserWithoutPassord
        }
    }
}