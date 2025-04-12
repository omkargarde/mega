import { Router } from "express";

import { healthCheck } from "../controllers/health-check.controller.ts";

const router = Router();

router.route("/").get(healthCheck);

export { router as healthCheckRouter };
