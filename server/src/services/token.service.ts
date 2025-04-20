import type { Types } from "mongoose";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "node:crypto";

import type { TSameSite } from "../types/same-site.type.ts";

const ComparePassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};

const GenerateAccessToken = (
  id: Types.ObjectId,
  email: string,
  username: string
) => {
  return jwt.sign(
    {
      _id: id,
      email: email,
      username: username,
    },
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    process.env.JWT_SECRET!,
    { expiresIn: process.env.JWT_EXPIRE_TIME }
  );
};

const VerifyToken = (token: string) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return jwt.verify(token, process.env.JWT_SECRET!);
};
const UnHashedToken = () => {
  return crypto.randomBytes(20).toString("hex");
};

const HashedToken = (unHashedToken: crypto.BinaryLike) => {
  crypto.createHash("sha256").update(unHashedToken).digest("hex");
};

const GetJwtCookieOptions = () => {
  return {
    httpOnly: Boolean(process.env.IS_PROD), // Set to false for testing
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    maxAge: Number(process.env.JWT_EXPIRE_TIME!), // convert to number
    path: "/",
    sameSite: "lax" as TSameSite,
    secure: Boolean(process.env.IS_PROD), // Set to false for local development
  };
};

const FlushJwtCookieOptions = () => {
  return {
    expires: new Date(0), // This will make the cookie expire immediately
    httpOnly: false,
    path: "/",
    sameSite: "lax" as TSameSite,
    secure: false,
  };
};

export {
  ComparePassword,
  FlushJwtCookieOptions,
  GenerateAccessToken,
  GetJwtCookieOptions,
  HashedToken,
  UnHashedToken,
  VerifyToken,
};
