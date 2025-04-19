import { UserModel } from "../models/user.model.ts";
import { UnHashedToken } from "./token.service.ts";

const FindUser = async (email: string) => {
  return await UserModel.findOne({
    email: { $eq: email },
  });
};

const CreateUser = async (
  email: string,
  password: string,
  username: string,
) => {
  return await UserModel.create({
    email,
    password,
    username,
  });
};

const addEmailVerificationToken = async (user: unknown) => {
  if (user instanceof UserModel) {
    const token = UnHashedToken();
    user.emailVerificationToken = token;
    await user.save();
  }
};

const VerifyEmailToken = async (token: string) => {
  return await UserModel.findOne({
    emailVerificationExpiry: { $gt: Date.now() },
    emailVerificationToken: token,
  });
};

const VerifyUser = async (user: unknown) => {
  if (user instanceof UserModel) {
    user.isEmailVerified = true;
    user.emailVerificationToken = null;
    user.emailVerificationExpiry = null;
    return await user.save();
  }
};

export {
  addEmailVerificationToken,
  CreateUser,
  FindUser,
  VerifyEmailToken,
  VerifyUser,
};
