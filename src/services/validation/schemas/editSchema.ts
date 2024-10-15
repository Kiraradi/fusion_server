import { object, string } from "yup";
import { REGEX_FOR_YUP } from "./shemasData";

export const editUserSchame = object({
  fullName: string().max(50),
  email: string().email(),
  dayOfBirthday: string().matches(REGEX_FOR_YUP.dayOfBirthday),
});
