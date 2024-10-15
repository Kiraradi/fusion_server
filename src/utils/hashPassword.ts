import crypto from "crypto";
import { config } from "../configEnv";

export const hashPassword = (passowd: string) => {
  const hash = crypto.pbkdf2Sync(
    passowd,
    config.TOKEN_SECRET,
    config.SERVER_HASH_ITERATIONS,
    config.SERVER_HASH_BYTES,
    config.SERVER_HASH_DIGEST,
  );

  return hash.toString("hex");
};
