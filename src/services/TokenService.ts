import { JwtPayload, sign } from "jsonwebtoken";
import { verify } from "jsonwebtoken";
import { config } from "../configEnv";

interface IJwtPayload extends JwtPayload {
  payload: number;
}

export const generateAccessToken = (userId: number): string => {
  return sign({ payload: userId }, config.TOKEN_SECRET, {
    expiresIn: config.SERVER_ACCESS_TOKEN_EXPIRES,
  });
};

export const generateRefreshToken = (userId: number): string => {
  return sign({ payload: userId }, config.REFRESH_TOKEN_SECRET, {
    expiresIn: config.SERVER_REFRESH_TOKEN_EXPIRES,
  });
};

export const verifyAccessToken = (token: string) => {
  try {
    const data = verify(token, config.TOKEN_SECRET) as IJwtPayload;

    return data.payload;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const verifyRefreshToken = (token: string) => {
  try {
    const data = verify(token, config.REFRESH_TOKEN_SECRET) as IJwtPayload;

    return data.payload;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
