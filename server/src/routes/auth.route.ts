import { Router } from "express";

import { registerUser } from "../controllers/auth.controller.ts";
import { validate } from "../middlewares/validator.middleware.ts";
import { userRegistrationValidator } from "../validators/user.validator.ts";

const router = Router();

router
  .route("/register")
  .post(userRegistrationValidator(), validate, registerUser);

export { router as authRouter };
