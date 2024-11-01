import { commonSchema } from "../schemasData";

export const getBookSchama = {
  params: {
    id: commonSchema.id.required(),
  },
};
