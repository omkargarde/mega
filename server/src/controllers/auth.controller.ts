import type { Request, Response } from "express";

import crypto from "node:crypto";

import { HTTP_STATUS_CODES } from "../constants/status.constant.ts";
import { UserModel } from "../models/user.model.ts";
import { ApiError } from "../utils/api-error.util.ts";
import { ApiResponse } from "../utils/api-response.util.ts";
import { asyncHandler } from "../utils/async-handler.util.ts";

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, username } = req.body as {
    email: string;
    password: string;
    username: string;
  };

  //validation
  try {
    const existingUser = await UserModel.findOne({
      email,
    });
    if (existingUser) {
      return res
        .status(HTTP_STATUS_CODES.CONFLICT)
        .json(
          new ApiResponse(
            HTTP_STATUS_CODES.CONFLICT,
            "",
            "User already exists",
          ),
        );
    }

    const token = crypto.randomBytes(32).toString("hex");

    const tokenExpiry: Date = new Date(
      new Date().getTime() + Number(process.env.REGISTRATION_TOKEN_EXPIRY ?? 0),
    );

    const user = await UserModel.create({
      email,
      emailVerificationExpiry: tokenExpiry,
      emailVerificationToken: token,
      password,
      username,
    });
    if (!user) {
      return res
        .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json(
          new ApiResponse(
            HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            "",
            "Failed to create user",
          ),
        );
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new ApiError(
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        error.message,
        [error.cause],
        error.stack,
      );
    }
    throw new ApiError();
  }
});

const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, role, username } = req.body;

  //validation
});

const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, role, username } = req.body;

  //validation
});

const verifyEmail = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, role, username } = req.body;

  //validation
});

const resendEmailVerification = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password, role, username } = req.body;

    //validation
  },
);

const resetForgottenPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password, role, username } = req.body;

    //validation
  },
);

const refreshAccessToken = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, role, username } = req.body;

  //validation
});

const forgotPasswordRequest = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password, role, username } = req.body;

    //validation
  },
);

const changeCurrentPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password, role, username } = req.body;

    //validation
  },
);

const getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, role, username } = req.body;

  //validation
});

export {
  changeCurrentPassword,
  forgotPasswordRequest,
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  resendEmailVerification,
  resetForgottenPassword,
  verifyEmail,
};
