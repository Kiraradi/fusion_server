import { commonSchema } from "../schemasData";

export const saveAvatarSchema = {
  body: {
    baseImg: commonSchema.baseImg.required(),
    extension: commonSchema.extension.required(),
  },
};
