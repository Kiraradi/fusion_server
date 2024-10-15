import { object, string } from "yup";
import { commonSchema } from "./schemasData";

export const refreshAccessTokenSchema = object({
  refreshToken: commonSchema.refreshToken.required(),
});
