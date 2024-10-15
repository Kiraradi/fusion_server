import { object } from "yup";
import { commonSchema } from "./schemasData";

export const registrationSchama = {
  body: {
    fullName: commonSchema.fullName.required(),
    email: commonSchema.email.required(),
    password: commonSchema.password.required(),
    dayOfBirthday: commonSchema.dayOfBirthday.required(),
  },
};
