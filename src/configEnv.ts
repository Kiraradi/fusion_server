import dotenv from "dotenv";
import { normalize } from "path";

const defaultEnv = dotenv.config({
  path: normalize(__dirname + "/../default.env"),
}).parsed;

const currentEnv = dotenv.config({
  path: normalize(__dirname + "/../.env"),
}).parsed;

if (!Object.keys(currentEnv as Record<string, string>).length) {
  console.error(`You don't have .env file`);
  process.exit(1);
}

for (const key in defaultEnv) {
  if (!currentEnv?.[key]) {
    console.log(
      `===> WARNING: Key ${key} is missing in the .env file or equals undefined!`,
    );
  }
}

type ConfigType = {
  TOKEN_SECRET: string;
  REFRESH_TOKEN_SECRET: string;
  SERVER_PORT: number;
  SERVER_DATADASE_PORT: number;
  SERVER_HOST: string;
  SERVER_DATADASE_USERNAME: string;
  SERVER_DATABASE_NAME: string;
  SERVER_DATADASE_PASSWORD: string;
  SERVER_HASH_DIGEST: string;
  SERVER_HASH_ITERATIONS: number;
  SERVER_HASH_BYTES: number;
  SERVER_ACCESS_TOKEN_EXPIRES: string;
  SERVER_REFRESH_TOKEN_EXPIRES: string;
};

const joinedEnv = {
  ...defaultEnv,
  ...currentEnv,
} as unknown as ConfigType;

export const config: ConfigType = {
  TOKEN_SECRET: String(joinedEnv.TOKEN_SECRET),
  REFRESH_TOKEN_SECRET: String(joinedEnv.REFRESH_TOKEN_SECRET),
  SERVER_PORT: Number(joinedEnv.SERVER_PORT),
  SERVER_DATADASE_PORT: Number(joinedEnv.SERVER_DATADASE_PORT),
  SERVER_HOST: String(joinedEnv.SERVER_HOST),
  SERVER_DATADASE_USERNAME: String(joinedEnv.SERVER_DATADASE_USERNAME),
  SERVER_DATABASE_NAME: String(joinedEnv.SERVER_DATABASE_NAME),
  SERVER_DATADASE_PASSWORD: String(joinedEnv.SERVER_DATADASE_PASSWORD),
  SERVER_HASH_DIGEST: String(joinedEnv.SERVER_HASH_DIGEST),
  SERVER_HASH_ITERATIONS: Number(joinedEnv.SERVER_HASH_ITERATIONS),
  SERVER_HASH_BYTES: Number(joinedEnv.SERVER_HASH_BYTES),
  SERVER_ACCESS_TOKEN_EXPIRES: String(joinedEnv.SERVER_ACCESS_TOKEN_EXPIRES),
  SERVER_REFRESH_TOKEN_EXPIRES: String(joinedEnv.SERVER_REFRESH_TOKEN_EXPIRES),
};
