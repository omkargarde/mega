import type { NextFunction, Response } from "express";

import type { ICustomRequest } from "../types/custom-request.types.ts";

import { USER_MESSAGES } from "../constants/user.constant.ts";
import { VerifyToken } from "../services/user/auth.service.ts";
import {
  InternalServerErrorException,
  NotFoundException,
} from "../utils/error.util.ts";
const isLoggedIn = (req: ICustomRequest, res: Response, next: NextFunction) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const token: string = req.cookies.jwtToken;
    if (token) {
      throw new NotFoundException(USER_MESSAGES.BadToken);
    }
    const decoded = VerifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof Error)
      throw new InternalServerErrorException(error.message);
  }
};

export { isLoggedIn };
