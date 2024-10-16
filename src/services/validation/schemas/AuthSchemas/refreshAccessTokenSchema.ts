import { object, string } from "yup";
import { commonSchema } from "../schemasData";

export const refreshAccessTokenSchema = {
  body: {
    refreshToken: commonSchema.refreshToken.required(),
  },
};
