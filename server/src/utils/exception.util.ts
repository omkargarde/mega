import { error } from "console";

import {
  HTTP_ERROR_MESSAGES,
  HTTP_STATUS_CODES,
} from "../constants/status.constant.ts";
import { ApiError } from "./api-error.util.ts";

class BadRequestException extends Error {
  constructor(message: string = HTTP_ERROR_MESSAGES.BadRequest) {
    super(message);
    throw new ApiError(HTTP_STATUS_CODES.BadRequest, message);
  }
}

class ConflictException extends Error {
  constructor(message: string = HTTP_ERROR_MESSAGES.Conflict) {
    super(message);
    throw new ApiError(HTTP_STATUS_CODES.Conflict, message);
  }
}

class InternalServerErrorException extends Error {
  constructor(message: string = HTTP_ERROR_MESSAGES.InternalServerError) {
    super(message);
    throw new ApiError(HTTP_STATUS_CODES.InternalServerError, message);
  }
}
class UnauthorizedException extends Error {
  constructor(message: string = HTTP_ERROR_MESSAGES.Unauthorized) {
    super(message);
    throw new ApiError(HTTP_STATUS_CODES.Unauthorized, message);
  }
}
export {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
};
