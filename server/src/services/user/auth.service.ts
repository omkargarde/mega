import type { Types } from "mongoose";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "node:crypto";
const ComparePassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};

const GenerateAccessToken = (
  id: Types.ObjectId,
  email: string,
  username: string,
) => {
  return jwt.sign(
    {
      _id: id,
      email: email,
      username: username,
    },

    process.env.ACCESS_TOKEN_SECRET ?? "test",
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    { expiresIn: (process.env.ACCESS_TOKEN_EXPIRY as string) ?? "1d" },
  );
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
};
