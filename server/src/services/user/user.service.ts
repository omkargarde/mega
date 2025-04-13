import { UserModel } from "../../models/user.model.ts";


const FindUser = async (email: string) => {
  return await UserModel.findOne({
    email: { $eq: email },
  });
};

const CreateUser = async (
  email: string,
  tokenExpiry: Date,
  token: string,
  password: string,
  username: null | string,
) => {
  const name = username ?? undefined;
  return await UserModel.create({
    email,
    emailVerificationExpiry: tokenExpiry,
    emailVerificationToken: token,
    password,
    username: name,
  });
};

const VerifyEmailToken = async (token: string) => {
  return await UserModel.findOne({
    emailVerificationExpiry: { $gt: Date.now() },
    emailVerificationToken: token,
  });
};

const VerifyUser = async (userVerifiedEmail: unknown) => {
  if (userVerifiedEmail instanceof UserModel) {
    userVerifiedEmail.isEmailVerified = true;
    userVerifiedEmail.emailVerificationToken = null;
    userVerifiedEmail.emailVerificationExpiry = null;
    return await userVerifiedEmail.save();
  }
};

export { CreateUser, FindUser, VerifyEmailToken, VerifyUser };

