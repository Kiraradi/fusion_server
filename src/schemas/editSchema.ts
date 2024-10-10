import { object, string } from "yup";
import { REGEX_FOR_YUP } from "../constants";

export const editUserSchame = object({
    fullName: string().max(50),
    email: string().email(),
    dayOfBirthday: string().matches(REGEX_FOR_YUP.dayOfBirthday)
}).noUnknown(true, 'Unknown fields were passed in the request')