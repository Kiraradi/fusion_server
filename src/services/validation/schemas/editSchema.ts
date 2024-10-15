import { object } from "yup";
import { commonSchema } from "./schemasData";

export const editUserSchama = object({
  fullName: commonSchema.fullName,
  email: commonSchema.email,
  dayOfBirthday: commonSchema.dayOfBirthday,
});
