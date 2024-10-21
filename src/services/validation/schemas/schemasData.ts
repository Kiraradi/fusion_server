import { number, string } from "yup";

export const REGEX_FOR_YUP = {
  password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/,
  dayOfBirthday: /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[012])\.([12][0-9]{3})$/,
};

export const commonSchema = {
  password: string().matches(REGEX_FOR_YUP.password),
  fullName: string().max(50),
  email: string().email(),
  refreshToken: string().min(100).max(200),
  id: number(),
};
