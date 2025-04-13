import { Router } from "express";

import {
  loginUser,
  registerUser,
  verifyEmail,
} from "../controllers/auth.controller.ts";
import { validate } from "../middlewares/validator.middleware.ts";
import {
  userEmailVerificationValidator,
  userLoginValidator,
  userRegistrationValidator,
} from "../validators/user.validator.ts";

const router = Router();

router
  .route("/register")
  .post(userRegistrationValidator(), validate, registerUser);

router
  .route("/verify/:token")
  .post(userEmailVerificationValidator(), validate, verifyEmail);

router.route("/login").post(userLoginValidator(), validate, loginUser);

export { router as authRouter };
