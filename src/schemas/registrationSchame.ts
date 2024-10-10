import { object, string } from "yup";
import { REGEX_FOR_YUP } from "../constants";

export const registrationSchame = object({
  fullName: string().max(50).required(),
  email: string().email().required(),
  password: string().matches(REGEX_FOR_YUP.password).required(),
  dayOfBirthday: string().matches(REGEX_FOR_YUP.dayOfBirthday).required(),
}).noUnknown(true, "Unknown fields were passed in the request");
