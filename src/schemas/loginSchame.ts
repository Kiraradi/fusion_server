import { object, string } from "yup";
import { REGEX_FOR_YUP } from "../constants";

export const loginSchame = object({
    email: string().email().required(),
    password: string().matches(REGEX_FOR_YUP.password).required(),
})


