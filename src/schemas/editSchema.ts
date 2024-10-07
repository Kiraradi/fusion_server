import { object, string } from "yup";
import { REGEX_FOR_YUP } from "../constants";

export const registrationSchame = object({
    fullName: string().max(50),
    email: string().email(),
    password: string().matches(REGEX_FOR_YUP.password),
    dayOfBirthday: string().matches(REGEX_FOR_YUP.dayOfBirthday)
})