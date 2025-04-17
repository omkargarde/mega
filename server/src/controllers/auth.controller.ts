import type { Request, Response } from "express";

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
import { ApiResponse } from "../utils/api-response.util.ts";
import { asyncHandler } from "../utils/async-handler.util.ts";
import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from "../utils/error.util.ts";
import { sendVerificationMail } from "../utils/send-mail.util.ts";

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, username } = req.body as {
    email: string;
    password: string;
    username: null | string;
  };
  const userDoesExist = await FindUser(email);
  if (userDoesExist) {
    throw new ConflictException(USER_MESSAGES.UserExists);
  }

  const token = UnHashedToken();
  const tokenExpiry = TokenExpiry();
  const user = await CreateUser(email, tokenExpiry, token, password, username);

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!user) {
    throw new InternalServerErrorException(USER_MESSAGES.FailedUserCreation);
  }
  if (!user.emailVerificationToken) {
    throw new InternalServerErrorException(
      USER_MESSAGES.FailedUserTokenCreation,
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
});

const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body as {
    email: string;
    password: string;
  };
  const user = await FindUser(email);
  if (!user) {
    throw new UnauthorizedException(USER_MESSAGES.CredFailed);
  }
  if (!user.isEmailVerified) {
    throw new UnauthorizedException(USER_MESSAGES.EmailNotVerified);
  }
  const isPasswordCorrect = await ComparePassword(password, user.password);
  if (!isPasswordCorrect) {
    throw new UnauthorizedException(USER_MESSAGES.CredFailed);
  }

  const accessToken = GenerateAccessToken(user._id, user.email, user.username);
  res.cookie(TOKEN_ENUM.AccessToken, accessToken, {
    expires: AccessTokenExpiry(),
    httpOnly: true,
  });
  return res
    .status(HTTP_STATUS_CODES.Ok)
    .json(new ApiResponse(HTTP_STATUS_CODES.Ok, "", USER_MESSAGES.credSuccess));
});

const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, role, username } = req.body;
});

const verifyEmail = asyncHandler(async (req: Request, res: Response) => {
  const { token } = req.params;
  const userVerifiedEmail = await VerifyEmailToken(token ?? "");
  if (!userVerifiedEmail) {
    throw new BadRequestException(USER_MESSAGES.BadEmailToken);
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
