import { Router } from "express";

import { userRegistrationValidator } from "../validators/user.validator.ts";

const router = Router();

router
  .route("/register")
  .post(userRegistrationValidator(), validate, registerUser);

export default router;
