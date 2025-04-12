import type { Request, Response } from "express";

import {
  HTTP_STATUS_CODES,
  HTTP_STATUS_MESSAGES,
} from "../constants/status.constant.ts";
import { ApiResponse } from "../utils/api-response.util.ts";

const healthCheck = (req: Request, res: Response) => {
  console.log("logic to connect with db");

  res
    .status(HTTP_STATUS_CODES.OK)
    .json(
      new ApiResponse(
        HTTP_STATUS_CODES.OK,
        "",
        HTTP_STATUS_MESSAGES.SERVICE_AVAILABLE,
      ),
    );
};

export { healthCheck };
