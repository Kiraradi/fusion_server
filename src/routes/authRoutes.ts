import { Router } from "express";
import { validateRequestBody } from "../middleware/validateRequestBody";
import { loginUserController } from "../controllers/auth/loginUserController";
import { loginSchame } from "../schemas/loginSchame";
import { registrationSchame } from "../schemas/registrationSchame";
import { registrationUserController } from "../controllers/auth/registrationUserController";

const authRouter = Router();

authRouter.post('/login', validateRequestBody(loginSchame), loginUserController);
authRouter.post('/registration', validateRequestBody(registrationSchame), registrationUserController);

export default authRouter;