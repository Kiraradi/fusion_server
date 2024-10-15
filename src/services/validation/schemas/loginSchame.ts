import { object } from "yup";
import { VALIDATION_FOR_YUP } from "./shemasData";

export const loginSchame = object().shape({
  email: VALIDATION_FOR_YUP.email.required(),
  password: VALIDATION_FOR_YUP.password.required(),
});
