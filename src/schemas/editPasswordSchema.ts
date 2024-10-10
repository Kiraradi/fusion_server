import { object, string } from "yup";
import { REGEX_FOR_YUP } from "../constants";

export const editPasswordSchema = object().shape({
    oldPassword: string().matches(REGEX_FOR_YUP.password).required('Invalid old password'),
    newPassword: string().matches(REGEX_FOR_YUP.password).required('Invalid  new password'),
}).noUnknown(true, 'Unknown fields were passed in the request');

