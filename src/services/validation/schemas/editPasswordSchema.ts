import { object } from "yup";
import { commonSchema } from "./schemasData";

export const editPasswordSchema = object()
  .shape({
    password: commonSchema.password.required(),
    newPassword: commonSchema.password.required(),
  })
  .test(
    "check password test",
    "The new password must not match the current one",
    ({ password, newPassword }) => {
      return password !== newPassword;
    },
  );
