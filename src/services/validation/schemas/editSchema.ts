import { object } from "yup";
import { VALIDATION_FOR_YUP } from "./shemasData";

export const editUserSchame = object({
  fullName: VALIDATION_FOR_YUP.fullName,
  email: VALIDATION_FOR_YUP.email,
  dayOfBirthday: VALIDATION_FOR_YUP.dayOfBirthday,
});
