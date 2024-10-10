import { object, string } from "yup";
import { REGEX_FOR_YUP } from "../constants";

export const loginSchame = object().shape({
    email: string().email().required('Invalid email'),
    password: string().matches(REGEX_FOR_YUP.password).required('Invalid password'),
}).noUnknown(true, 'Unknown fields were passed in the request');


