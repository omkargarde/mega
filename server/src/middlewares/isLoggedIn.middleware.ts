import type { NextFunction, Request, Response } from "express";

import { HTTP_ERROR_MESSAGES } from "../constants/status.constant.ts";
import { USER_MESSAGES } from "../constants/user.constant.ts";
import { VerifyToken } from "../services/token.service.ts";
import {
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "../utils/error.util.ts";
const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("=== Auth Middleware Debug ===");
    console.log("Cookies:", req.cookies);
    console.log("Headers:", {
      authorization: req.headers.authorization,
      cookie: req.headers.cookie,
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    let token = req.cookies?.token as string;

    // Check Authorization header if no cookie
    if (!token && req.headers.authorization) {
      token = req.headers.authorization.replace("Bearer ", "");
    }
    if (!token) {
      throw new NotFoundException(USER_MESSAGES.TokenNotFound);
    }

    try {
      // Verify token
      const decoded = VerifyToken(token);
      console.log("Token verified successfully");

      req.user = decoded;
      next();
    } catch (error) {
      throw new UnauthorizedException(USER_MESSAGES.BadToken, error);
    }
  } catch (error) {
    throw new InternalServerErrorException(
      HTTP_ERROR_MESSAGES.InternalServerError,
      error,
    );
  }
};

export { isLoggedIn };
