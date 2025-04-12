import type { Request, Response } from "express";

import crypto from "node:crypto";

import {
  HTTP_ERROR_MESSAGES,
  HTTP_STATUS_CODES,
} from "../constants/status.constant.ts";
import { UserModel } from "../models/user.model.ts";
import { ApiResponse } from "../utils/api-response.ts";
import { asyncHandler } from "../utils/async-handler.ts";

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

    const user = new UserModel.create({});
  } catch (error: unknown) {
    let data = "Something went wrong";
    if (error instanceof Error) {
      data = error.message;
    }

    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(
        new ApiResponse(
          HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
          data,
          HTTP_ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        ),
      );
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
