import { object } from "yup";
import { VALIDATION_FOR_YUP } from "./shemasData";

export const editPasswordSchema = object()
  .shape({
    password: VALIDATION_FOR_YUP.password.required(),
    newPassword: VALIDATION_FOR_YUP.password.required(),
  })
  .test(
    "check password test",
    "The new password must not match the current one",
    ({ password, newPassword }) => {
      return password !== newPassword;
    },
  );
