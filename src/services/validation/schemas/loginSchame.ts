import { object, string } from "yup";
import { REGEX_FOR_YUP } from "./shemasData";

export const loginSchame = object().shape({
  email: string().email().required("Invalid email"),
  password: string()
    .matches(REGEX_FOR_YUP.password)
    .required("Invalid password"),
});
