import type { Request } from "express";
import type { JwtPayload } from "jsonwebtoken";

interface ICustomRequest extends Request {
  user: JwtPayload | string;
}
export type { ICustomRequest };
