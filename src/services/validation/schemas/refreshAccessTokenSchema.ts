import { object, string } from "yup";
import { VALIDATION_FOR_YUP } from "./shemasData";

export const refreshAccessTokenSchema = object({
  refreshToken: VALIDATION_FOR_YUP.refreshToken.required(),
});
