//user controllers
import type { CookieOptions, Request, Response } from "express";

import bcrypt from "bcryptjs";

import type { ICustomRequest } from "../types/custom-request.types.ts";
import type { IUserRequestBody } from "../types/user.type.ts";

import { HTTP_STATUS_CODES } from "../constants/status.constant.ts";
import { USER_MESSAGES, UserToken } from "../constants/user.constant.ts";
import { UserModel } from "../models/user.model.ts";
import {
  SendForgotPasswordTokenMail,
  SendVerificationTokenMail,
} from "../services/mail.service.ts";
import {
  FlushJwtCookieOptions,
  GenerateAccessToken,
  GetJwtCookieOptions,
  UnHashedToken,
} from "../services/token.service.ts";
import {
  AddEmailVerificationToken,
  FindUserWithToken,
  ResetPassword,
  SetNewPassword,
  VerifyUser,
} from "../services/user.service.ts";
import { ApiResponse } from "../utils/api-response.util.ts";
import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from "../utils/error.util.ts";

const registerUser = async (req: Request, res: Response) => {
  //register user
  const { email, name, password } = req.body as IUserRequestBody;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException(USER_MESSAGES.UserConflict);
    }
    const user = await UserModel.create({
      email,
      name,
      password,
    });

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!user) {
      throw new UnprocessableEntityException(USER_MESSAGES.FailedUserCreation);
    }

    await AddEmailVerificationToken(user);

    if (!user.emailVerificationToken || !user.email) {
      throw new InternalServerErrorException("failed to add token or email");
    }

    await SendVerificationTokenMail(user.emailVerificationToken, user.email);

    res
      .status(HTTP_STATUS_CODES.Ok)
      .json(
        new ApiResponse(
          HTTP_STATUS_CODES.Ok,
          "",
          USER_MESSAGES.SucceededUserCreation
        )
      );
  } catch (error) {
    throw new UnprocessableEntityException(
      USER_MESSAGES.FailedUserCreation,
      error
    );
  }
};

const verifyUser = async (req: Request, res: Response) => {
  //verify user
  const { token } = req.params;
  console.log(token);
  if (!token) {
    throw new BadRequestException(USER_MESSAGES.BadEmailToken);
  }
  const user = await UserModel.findOne({ verificationToken: token });
  if (!user) {
    throw new BadRequestException(USER_MESSAGES.BadEmailToken);
  }
  await VerifyUser(user);

  res
    .status(HTTP_STATUS_CODES.Ok)
    .json(
      new ApiResponse(HTTP_STATUS_CODES.Ok, "", USER_MESSAGES.VerifiedUserEmail)
    );
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body as IUserRequestBody;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  console.log(isMatch);
  if (!isMatch) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const token = GenerateAccessToken(user._id, user.email, user.username);

  const cookieOptions: CookieOptions = GetJwtCookieOptions();

  res.cookie(UserToken.token, token, cookieOptions);

  const returnUser = {
    email: user.email,
    id: user._id,
    name: user.username,
    role: user.role,
  };
  res
    .status(HTTP_STATUS_CODES.Ok)
    .json(
      new ApiResponse(
        HTTP_STATUS_CODES.Ok,
        returnUser,
        USER_MESSAGES.credSuccess
      )
    );
};

const getMe = async (req: ICustomRequest, res: Response) => {
  const user = await UserModel.findById(req.user.id).select("-password");

  if (!user) {
    throw new NotFoundException(USER_MESSAGES.UserNotFound);
  }

  res
    .status(HTTP_STATUS_CODES.Ok)
    .json(new ApiResponse(HTTP_STATUS_CODES.Ok, user, USER_MESSAGES.UserFound));
};

const logoutUser = (req: Request, res: Response) => {
  // Clear the token cookie
  const cookieOptions = FlushJwtCookieOptions();
  res.cookie("token", "", cookieOptions);

  res
    .status(HTTP_STATUS_CODES.Ok)
    .json(
      new ApiResponse(HTTP_STATUS_CODES.Ok, "", USER_MESSAGES.UserLoggedOut)
    );
};

const forgotPassword = async (req: Request, res: Response) => {
  //get user by email and send reset token
  const { email } = req.body as IUserRequestBody;

  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message: "Invalid email",
    });
  }
  const resetToken = UnHashedToken();
  await ResetPassword(user, resetToken);

  await SendForgotPasswordTokenMail(user.email, resetToken);

  res
    .status(HTTP_STATUS_CODES.Ok)
    .json(
      new ApiResponse(HTTP_STATUS_CODES.Ok, "", USER_MESSAGES.ForgotPassword)
    );
};

const resetPassword = async (req: Request, res: Response) => {
  //reset password
  const { token } = req.params;
  const { password } = req.body as IUserRequestBody;
  if (!token) {
    throw new BadRequestException(USER_MESSAGES.BadToken);
  }
  const user = await FindUserWithToken(token);
  if (!user) {
    throw new NotFoundException(USER_MESSAGES.UserNotFound);
  }
  await SetNewPassword(user, password);
  res
    .status(HTTP_STATUS_CODES.Ok)
    .json(
      new ApiResponse(
        HTTP_STATUS_CODES.Ok,
        "",
        USER_MESSAGES.forgotPasswordSuccess
      )
    );
};

export {
  forgotPassword,
  getMe,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  verifyUser,
};
