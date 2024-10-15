import { object, string } from "yup";

export const refreshAccessTokenSchema = object({
  refreshToken: string().min(100).max(200).required("invalid token"),
}).noUnknown(true, "Unknown fields were passed in the request");
