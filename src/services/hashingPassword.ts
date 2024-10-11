import crypto from "crypto";
import { PROCESS_ENV } from "../constants";

export const hashingPassword = (passowd: string) => {
  const hash = crypto.pbkdf2Sync(
    passowd,
    PROCESS_ENV.TOKEN_SECRET,
    PROCESS_ENV.SERVER_HASH_ITERATIONS,
    PROCESS_ENV.SERVER_HASH_BYTES,
    PROCESS_ENV.SERVER_HASH_DIGEST,
  );

  return hash.toString("hex");
};
