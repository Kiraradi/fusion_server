import { object } from "yup";
import { commonSchema } from "./schemasData";

export const getUserSchama = object({
  id: commonSchema.id.required(),
});
