import dotenv from "dotenv";

dotenv.config();

export const REGEX_FOR_YUP = {
  password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/,
  dayOfBirthday: /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[012])\.([12][0-9]{3})$/,
};

export const PROCESS_ENV = {
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
};
