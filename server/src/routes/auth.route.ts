import { Router } from "express";

import { registerUser, verifyEmail } from "../controllers/auth.controller.ts";
import { validate } from "../middlewares/validator.middleware.ts";
import {
  userEmailVerificationValidator,
  userRegistrationValidator,
} from "../validators/user.validator.ts";

const router = Router();

router
  .route("/register")
  .post(userRegistrationValidator(), validate, registerUser);

router
  .route("/verify/:token")
  .post(userEmailVerificationValidator(), validate, verifyEmail);

export { router as authRouter };
