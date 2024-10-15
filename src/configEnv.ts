import dotenv from "dotenv";
import FS from "fs";

const defaultEnv = dotenv.parse(FS.readFileSync("defult.env"));

const currentEnv = dotenv.config().parsed;

for (const key in defaultEnv) {
  if (!currentEnv) {
    break;
  }
  if (!currentEnv[key]) {
    console.log(
      `===> WARNING: Key ${key} is missing in the .env file or equals undefined!`,
    );
  }
}

export const CONFIG_ENV = {
  TOKEN_SECRET: String(process.env.TOKEN_SECRET),
  REFRESH_TOKEN_SECRET: String(process.env.REFRESH_TOKEN_SECRET),
  SERVER_PORT: Number(process.env.SERVER_PORT),
  SERVER_DATADASE_PORT: Number(process.env.SERVER_DATADASE_PORT),
  SERVER_HOST: String(process.env.SERVER_HOST),
  SERVER_DATADASE_USERNAME: String(process.env.SERVER_DATADASE_USERNAME),
  SERVER_DATABASE_NAME: String(process.env.SERVER_DATABASE_NAME),
  SERVER_DATADASE_PASSWORD: String(process.env.SERVER_DATADASE_PASSWORD),
  SERVER_HASH_DIGEST: String(process.env.SERVER_HASH_DIGEST),
  SERVER_HASH_ITERATIONS: Number(process.env.SERVER_HASH_ITERATIONS),
  SERVER_HASH_BYTES: Number(process.env.SERVER_HASH_BYTES),
  SERVER_ACCESS_TOKEN_EXPIRES: String(process.env.SERVER_ACCESS_TOKEN_EXPIRES),
  SERVER_REFRESH_TOKEN_EXPIRES: String(
    process.env.SERVER_REFRESH_TOKEN_EXPIRES,
  ),
};
