import { object, string } from "yup";
import { REGEX_FOR_YUP } from "./shemasData";

export const editPasswordSchema = object()
  .shape({
    password: string()
      .matches(REGEX_FOR_YUP.password)
      .required("Invalid old password"),
    newPassword: string()
      .matches(REGEX_FOR_YUP.password)
      .required("Invalid  new password"),
  })
  .test(
    "check password test",
    "the new password must not match the current one",
    ({ password, newPassword }) => {
      return password !== newPassword;
    },
  )
  .noUnknown(true, "Unknown fields were passed in the request");
