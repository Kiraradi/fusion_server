import { object } from "yup";
import { commonSchema } from "../schemasData";

export const registrationSchama = {
  body: {
    email: commonSchema.email.required(),
    password: commonSchema.password.required(),
  },
};
