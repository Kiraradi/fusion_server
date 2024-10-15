import { object } from "yup";
import { commonSchema } from "./schemasData";

export const loginSchama = object().shape({
  email: commonSchema.email.required(),
  password: commonSchema.password.required(),
});
