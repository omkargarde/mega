//user controllers
import type { CookieOptions, Request, Response } from "express";

import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";

import type { ICustomRequest } from "../types/custom-request.types.ts";
import type {
  ILoginUserRequestBody,
  IRegisterUserRequestBody,
} from "../types/user.type.ts";

import {
  HTTP_STATUS_CODES,
  HTTP_STATUS_MESSAGES,
} from "../constants/status.constant.ts";
import { USER_MESSAGES } from "../constants/user.constant.ts";
import { UserModel } from "../models/user.model.ts";
import { sendVerificationTokenMail } from "../services/mail.service.ts";
import {
  GenerateAccessToken,
  GetJwtCookieOptions,
} from "../services/token.service.ts";
import {
  addEmailVerificationToken,
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
  const { email, name, password } = req.body as IRegisterUserRequestBody;

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

    await addEmailVerificationToken(user);

    if (!user.emailVerificationToken || !user.email) {
      throw new InternalServerErrorException("failed to add token or email");
    }

    await sendVerificationTokenMail(user.emailVerificationToken, user.email);

    res
      .status(HTTP_STATUS_CODES.Ok)
      .json(
        new ApiResponse(
          HTTP_STATUS_CODES.Ok,
          "",
          USER_MESSAGES.SucceededUserCreation,
        ),
      );
  } catch (error) {
    throw new UnprocessableEntityException(
      USER_MESSAGES.FailedUserCreation,
      error,
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
  try {
    const user = await UserModel.findOne({ verificationToken: token });
    if (!user) {
      throw new BadRequestException(USER_MESSAGES.BadEmailToken);
    }
    await VerifyUser(user);

    res
      .status(HTTP_STATUS_CODES.Ok)
      .json(
        new ApiResponse(
          HTTP_STATUS_CODES.Ok,
          "",
          USER_MESSAGES.VerifiedUserEmail,
        ),
      );
  } catch (error) {
    throw new BadRequestException(USER_MESSAGES.BadEmailToken, error);
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body as ILoginUserRequestBody;
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

  // Set cookie with minimal options for testing
  const cookieOptions: CookieOptions = GetJwtCookieOptions();

  // Set cookie before sending response
  res.cookie("token", token, cookieOptions);

  // Log headers to verify cookie is set
  // Send response
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
        HTTP_STATUS_MESSAGES.OK,
      ),
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

const logoutUser = (req, res) => {
  try {
    // Clear the token cookie
    res.cookie("token", "", {
      expires: new Date(0), // This will make the cookie expire immediately
      httpOnly: false,
      path: "/",
      sameSite: "lax",
      secure: false,
    });

    res.status(200).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      message: "Error during logout",
      success: false,
    });
  }
};

const forgotPassword = async (req, res) => {
  //get user by email and send reset token
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      message: "Email is required",
    });
  }
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid email",
      });
    }
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.passwordResetToken = resetToken;
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    const resetUrl = `${process.env.BASE_URL}/api/v1/users/reset-password/${resetToken}`;

    const transporter = nodemailer.createTransport({
      auth: {
        pass: process.env.MAILTRAP_PASSWORD,
        user: process.env.MAILTRAP_USERNAME,
      },
      host: process.env.MAILTRAP_HOST,
    });
    const mailOptions = {
      from: process.env.MAILTRAP_SENDER_EMAIL,
      subject: "Reset your password",
      text: `Please click on the following link to reset your password: ${resetUrl}`,
      to: user.email,
    };
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "Reset token sent to email",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  //reset password
  const { token } = req.params;
  const { password } = req.body;
  if (!token || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }
  try {
    const user = await UserModel.findOne({
      passwordResetExpires: { $gt: Date.now() },
      passwordResetToken: token,
    });
    if (!user) {
      return res.status(400).json({
        message: "Invalid token",
      });
    }
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.status(200).json({
      message: "Password reset successful",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
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
