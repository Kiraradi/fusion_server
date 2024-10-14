import { Router } from "express";
import { validateRequestBody } from "../middleware/validateRequestBody";
import { loginUserController } from "../controllers/auth/loginUserController";
import { loginSchame } from "../schemas/loginSchame";
import { registrationSchame } from "../schemas/registrationSchame";
import { registrationUserController } from "../controllers/auth/registrationUserController";
import { refreshAccessTokenSchema } from "../schemas/refreshAccessTokenSchema";
import { refreshAccessTokenController } from "../controllers/auth/refreshAccessTokenController";
import { checkPassword } from "../middleware/checkPassword";

const authRouter = Router();

authRouter.post(
  "/login",
  validateRequestBody(loginSchame),
  checkPassword,
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
