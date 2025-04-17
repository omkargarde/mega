import type { Types } from "mongoose";

import bcrypt from "bcryptjs";
import jwt, { type JwtPayload } from "jsonwebtoken";
import crypto from "node:crypto";

import { HTTP_STATUS_CODES } from "../../constants/status.constant.ts";
import { ApiError } from "../../utils/error.util.ts";

const ComparePassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};

const GenerateAccessToken = (
  id: Types.ObjectId,
  email: string,
  username: string,
) => {
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET ?? "test";
  const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY ?? "1d";
  if (!ACCESS_TOKEN_SECRET || !ACCESS_TOKEN_EXPIRY) {
    throw new ApiError(
      HTTP_STATUS_CODES.NotFound,
      "access token or expiry not set up",
    );
  }
  return jwt.sign(
    {
      _id: id,
      email: email,
      username: username,
    },
    ACCESS_TOKEN_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRY },
  );
};

const VerifyToken = (token: string) => {
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET ?? "test";
  return jwt.verify(token, ACCESS_TOKEN_SECRET);
};
const UnHashedToken = () => {
  return crypto.randomBytes(20).toString("hex");
};

const HashedToken = (unHashedToken: crypto.BinaryLike) => {
  crypto.createHash("sha256").update(unHashedToken).digest("hex");
};
const TokenExpiry = () => {
  const now = new Date();
  const future = new Date(now.getTime() + 20 * 60 * 1000);
  return future;
};

const AccessTokenExpiry = () => {
  return new Date(Date.now() + 24 * 60 * 60 * 100);
};
export {
  AccessTokenExpiry,
  ComparePassword,
  GenerateAccessToken,
  HashedToken,
  TokenExpiry,
  UnHashedToken,
  VerifyToken,
};
