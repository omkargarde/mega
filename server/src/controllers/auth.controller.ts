import type { Request, Response } from "express";

import crypto from "node:crypto";

import type { IHttpError } from "../types/http-error.type.ts";

import {
  HTTP_STATUS_CODES,
  HTTP_STATUS_MESSAGES,
} from "../constants/status.constant.ts";
import { UserModel } from "../models/user.model.ts";
import { existingUser } from "../services/user/existing-user.service.ts";
import { ApiError } from "../utils/api-error.util.ts";
import { ApiResponse } from "../utils/api-response.util.ts";
import { asyncHandler } from "../utils/async-handler.util.ts";
import { sendVerificationMail } from "../utils/send-mail.util.ts";

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, username } = req.body as {
    email: string;
    password: string;
    username: string | undefined;
  };

  //validation
  try {
    // const existingUser = await UserModel.findOne({
    //   email,
    // });
    // if (existingUser) {
    //   return res
    //     .status(HTTP_STATUS_CODES.Conflict)
    //     .json(
    //       new ApiResponse(
    //         HTTP_STATUS_CODES.Conflict,
    //         "",
    //         "User already exists",
    //       ),
    //     );
    // }
    const userDoesExist = await UserModel.findOne({
      email,
    });
    if (userDoesExist) {
      return res
        .status(HTTP_STATUS_CODES.Conflict)
        .json(
          new ApiResponse(
            HTTP_STATUS_CODES.Conflict,
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

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!user) {
      throw new ApiError(
        HTTP_STATUS_CODES.InternalServerError,
        "Failed to create user",
      );
    }
    if (!user.emailVerificationToken) {
      throw new ApiError(
        HTTP_STATUS_CODES.InternalServerError,
        "Failed to create email verification token",
      );
    }

    await sendVerificationMail(user.email, user.emailVerificationToken);

    return res
      .status(HTTP_STATUS_CODES.Ok)
      .json(
        new ApiResponse(
          HTTP_STATUS_CODES.Ok,
          "",
          "User Register Successfully, please verify your email",
        ),
      );
  } catch (error) {
    const err = error as IHttpError;
    const status = err.statusCode ?? 500;
    return res.status(status).json(new ApiResponse(status, "", err.message));
  }
});

const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, username } = req.body as {
    email: string;
    password: string;
    username: string | undefined;
  };
  try {
    const userDoesExist = await UserModel.findOne({
      email: { $eq: email },
    });
    if (!userDoesExist) {
      return res
        .status(HTTP_STATUS_CODES.NotFound)
        .json(
          new ApiResponse(
            HTTP_STATUS_CODES.NotFound,
            "",
            HTTP_STATUS_MESSAGES.NotFound,
          ),
        );
    }
  } catch (error) {
    const err = error as IHttpError;
    const status = err.statusCode ?? 500;
    return res.status(status).json(new ApiResponse(status, "", err.message));
  }
});

const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, role, username } = req.body;

  //validation
});

const verifyEmail = asyncHandler(async (req: Request, res: Response) => {
  const { token } = req.params;

  try {
    const user = await UserModel.findOne({
      emailVerificationExpiry: { $gt: Date.now() },
      emailVerificationToken: token,
    });

    if (!user) {
      throw new ApiError(
        HTTP_STATUS_CODES.BadRequest,
        "Verification token does not exist or is expired",
      );
    }
    user.isEmailVerified = true;
    user.emailVerificationToken = null;
    user.emailVerificationExpiry = null;
    await user.save();

    return res
      .status(HTTP_STATUS_CODES.Ok)
      .json(
        new ApiResponse(HTTP_STATUS_CODES.Ok, "", "User Email Successfully"),
      );
  } catch (error) {
    const err = error as IHttpError;
    const status = err.statusCode ?? 500;
    return res.status(status).json(new ApiResponse(status, "", err.message));
  }
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
