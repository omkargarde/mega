import type { NextFunction, Request, Response } from "express";

import { validationResult } from "express-validator";

import { ApiError } from "../utils/api-error.ts";

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    next();
    return;
  }

  const extractedErrors: Record<string, string>[] = [];
  errors.array().map((error) => {
    if (error.type === "alternative") {
      extractedErrors.push({ [error.type]: error.msg as string });
    }
    if (error.type === "field") {
      extractedErrors.push({ [error.path]: error.location });
    }
  });

  throw new ApiError(422, "Received data is not valid", extractedErrors);
};
// if (error.type === 'alternative') {
//   console.log(`There are ${error.nestedErrors.length} errors under this alternative list`);
// } else if (error.type === 'field') {
//   console.log(`There's an error with field ${error.path} in the request ${error.location}`);
// }
