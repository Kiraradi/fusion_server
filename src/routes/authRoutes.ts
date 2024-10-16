import { Router } from "express";
import { validateRequestBody } from "../middleware/validateRequestBody";
import { loginUserController } from "../controllers/auth/loginUserController";
import { registrationUserController } from "../controllers/auth/registrationUserController";
import { refreshAccessTokenController } from "../controllers/auth/refreshAccessTokenController";
import { loginSchama } from "../services/validation/schemas/AuthSchemas/loginSchama";
import { registrationSchama } from "../services/validation/schemas/AuthSchemas/registrationSchama";
import { refreshAccessTokenSchema } from "../services/validation/schemas/AuthSchemas/refreshAccessTokenSchema";

const authRouter = Router();

authRouter.post(
  "/login",
  validateRequestBody(loginSchama),
  loginUserController,
);
authRouter.post(
  "/registration",
  validateRequestBody(registrationSchama),
  registrationUserController,
);
authRouter.post(
  "/refreshAccessToken",
  validateRequestBody(refreshAccessTokenSchema),
  refreshAccessTokenController,
);

export default authRouter;
