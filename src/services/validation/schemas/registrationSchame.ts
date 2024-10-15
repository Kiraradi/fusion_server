import { object } from "yup";
import { VALIDATION_FOR_YUP } from "./shemasData";

export const registrationSchame = object({
  fullName: VALIDATION_FOR_YUP.fullName.required(),
  email: VALIDATION_FOR_YUP.email.required(),
  password: VALIDATION_FOR_YUP.password.required(),
  dayOfBirthday: VALIDATION_FOR_YUP.dayOfBirthday.required(),
});
