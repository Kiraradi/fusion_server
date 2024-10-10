import { JwtPayload, sign } from "jsonwebtoken";
import { verify } from "jsonwebtoken";
import { PROCESS_ENV } from "../constants";

interface IJwtPayload extends JwtPayload {
  payload: number;
}

export const generateAccessToken = (userId: number): string => {
  return sign({ payload: userId }, PROCESS_ENV.TOKEN_SECRET, {
    expiresIn: "1800s",
  });
};

export const verifyAccessToken = (token: string) => {
  try {
    const data = verify(token, PROCESS_ENV.TOKEN_SECRET) as IJwtPayload;

    return data.payload;
  } catch (error) {
    console.log(error);
    return null;
  }
};
