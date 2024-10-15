import { Router } from "express";
import { validateRequestBody } from "../middleware/validateRequestBody";
import { loginUserController } from "../controllers/auth/loginUserController";
import { registrationUserController } from "../controllers/auth/registrationUserController";
import { refreshAccessTokenController } from "../controllers/auth/refreshAccessTokenController";
import { loginSchame } from "../services/validation/schemas/loginSchame";
import { registrationSchame } from "../services/validation/schemas/registrationSchame";
import { refreshAccessTokenSchema } from "../services/validation/schemas/refreshAccessTokenSchema";

const authRouter = Router();

authRouter.post(
  "/login",
  validateRequestBody(loginSchame),
  loginUserController,
);
authRouter.post(
  "/registration",
  validateRequestBody(registrationSchame),
  registrationUserController,
);
authRouter.post(
  "/refreshAccessToken",
  validateRequestBody(refreshAccessTokenSchema),
  refreshAccessTokenController,
);

export default authRouter;
