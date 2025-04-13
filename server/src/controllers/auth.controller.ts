import type { Request, Response } from "express";


import type { IHttpError } from "../types/http-error.type.ts";

import { HTTP_STATUS_CODES } from "../constants/status.constant.ts";
import { TOKEN_ENUM } from "../constants/token.constant.ts";
import { USER_MESSAGES } from "../constants/user.constant.ts";
import {
  AccessTokenExpiry,
  ComparePassword,
  GenerateAccessToken,
  TokenExpiry,
  UnHashedToken,
} from "../services/user/auth.service.ts";
import {
  CreateUser,
  FindUser,
  VerifyEmailToken,
  VerifyUser,
} from "../services/user/user.service.ts";

import { ApiError } from "../utils/api-error.util.ts";
import { ApiResponse } from "../utils/api-response.util.ts";
import { asyncHandler } from "../utils/async-handler.util.ts";
import { sendVerificationMail } from "../utils/send-mail.util.ts";

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, username } = req.body as {
    email: string;
    password: string;
    username: null | string;
  };

  //validation
  try {
    const userDoesExist = await FindUser(email);

    if (userDoesExist) {
      return res
        .status(HTTP_STATUS_CODES.Conflict)
        .json(
          new ApiResponse(
            HTTP_STATUS_CODES.Conflict,
            "",
            USER_MESSAGES.UserExists,
          ),
        );
    }

    const token = UnHashedToken();
    const tokenExpiry = TokenExpiry();
    const user = await CreateUser(
      email,
      tokenExpiry,
      token,
      password,
      username,
    );

    if (!user) {
      throw new ApiError(
        HTTP_STATUS_CODES.InternalServerError,
        "Failed to create user",
      );
    }
    if (!user.emailVerificationToken) {
      throw new ApiError(
        HTTP_STATUS_CODES.InternalServerError,
        USER_MESSAGES.FailedUserCreation,
      );
    }

    await sendVerificationMail(user.email, user.emailVerificationToken);

    return res
      .status(HTTP_STATUS_CODES.Ok)
      .json(
        new ApiResponse(
          HTTP_STATUS_CODES.Ok,
          "",
          USER_MESSAGES.SucceededUserCreation,
        ),
      );
  } catch (error) {
    const err = error as IHttpError;
    const status = err.statusCode ?? 500;
    return res.status(status).json(new ApiResponse(status, "", err.message));
  }
});

const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body as {
    email: string;
    password: string;
  };
  try {
    const user = await FindUser(email);
    if (!user) {

      return res
        .status(HTTP_STATUS_CODES.Unauthorized)
        .json(
          new ApiResponse(
            HTTP_STATUS_CODES.Unauthorized,
            "qwe",
            USER_MESSAGES.CredFailed,
          ),
        );
    }
    if (!user.isEmailVerified) {
      return res
        .status(HTTP_STATUS_CODES.Unauthorized)
        .json(
          new ApiResponse(
            HTTP_STATUS_CODES.Unauthorized,
            "asd",
            USER_MESSAGES.EmailNotVerified,
          ),
        );
    }
    const isPasswordCorrect = await ComparePassword(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(HTTP_STATUS_CODES.Unauthorized)
        .json(
          new ApiResponse(
            HTTP_STATUS_CODES.Unauthorized,
            "zxc",
            USER_MESSAGES.EmailNotVerified,
          ),
        );
    }

    const accessToken = GenerateAccessToken(
      user._id,
      user.email,
      user.username,
    );
    res.cookie(TOKEN_ENUM.AccessToken, accessToken, {
      expires: AccessTokenExpiry(),
      httpOnly: true,
    });
    return res
      .status(HTTP_STATUS_CODES.Ok)
      .json(
        new ApiResponse(HTTP_STATUS_CODES.Ok, "", USER_MESSAGES.credSuccess),
      );
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
    const userVerifiedEmail = await VerifyEmailToken(token ?? "");
    if (!userVerifiedEmail) {
      return res
        .status(HTTP_STATUS_CODES.BadRequest)
        .json(
          new ApiResponse(
            HTTP_STATUS_CODES.BadRequest,
            "",
            USER_MESSAGES.BadEmailToken,
          ),
        );
    }
    if (await VerifyUser(userVerifiedEmail)) {
      return res
        .status(HTTP_STATUS_CODES.Ok)
        .json(
          new ApiResponse(
            HTTP_STATUS_CODES.Ok,
            "",
            USER_MESSAGES.VerifiedUserEmail,
          ),
        );
    }
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
