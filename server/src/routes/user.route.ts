import { Router } from "express";

import {
  forgotPassword,
  getMe,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  verifyUser,
} from "../controllers/user.controller.ts";
import { isLoggedIn } from "../middlewares/isLoggedIn.middleware.ts";
import { validate } from "../middlewares/validator.middleware.ts";
import {
  userEmailVerificationValidator,
  userLoginValidator,
  userRegistrationValidator,
} from "../validators/user.validator.ts";

const router = Router();

router.post(
  "/verify/:token",
  userEmailVerificationValidator(),
  validate,
  verifyUser,
);
router.post("/login", userLoginValidator(), validate, loginUser);
router.post("/register", userRegistrationValidator(), validate, registerUser);
router.get("/me", isLoggedIn, getMe);
router.get("/logout", isLoggedIn, logoutUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export { router as authRouter };
