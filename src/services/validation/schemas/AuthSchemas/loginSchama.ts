import { commonSchema } from "../schemasData";

export const loginSchama = {
  body: {
    email: commonSchema.email.required(),
    password: commonSchema.password.required(),
  },
};
