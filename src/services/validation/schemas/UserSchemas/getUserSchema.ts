import { commonSchema } from "../schemasData";

export const getUserSchama = {
  params: {
    id: commonSchema.id.required(),
  },
};
