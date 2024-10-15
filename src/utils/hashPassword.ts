import crypto from "crypto";
import { CONFIG_ENV } from "../configEnv";

export const hashPassword = (passowd: string) => {
  const hash = crypto.pbkdf2Sync(
    passowd,
    CONFIG_ENV.TOKEN_SECRET,
    CONFIG_ENV.SERVER_HASH_ITERATIONS,
    CONFIG_ENV.SERVER_HASH_BYTES,
    CONFIG_ENV.SERVER_HASH_DIGEST,
  );

  return hash.toString("hex");
};
