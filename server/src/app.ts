import cors from "cors";
import express, { urlencoded } from "express";

import { authRouter } from "./routes/user.route.ts";
import { healthCheckRouter } from "./routes/health-check.route.ts";
const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(
  cors({
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    origin: process.env.CORS_ORIGIN!,
  }),
);

app.use("/hc", healthCheckRouter);
app.use("/v1/api/users", authRouter);
export { app };
