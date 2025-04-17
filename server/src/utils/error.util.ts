import {
  HTTP_ERROR_MESSAGES,
  HTTP_STATUS_CODES,
} from "../constants/status.constant.ts";
class ApiError extends Error {
  protected errors;
  protected statusCode: number;
  protected success = false;
  /**
   * Construct an ApiError object.
   *
   * @param  statusCode - The HTTP status code for the error.
   * @param  message - The error message.
   * @param  errors - An array of error objects.
   * @param  stack - The error stack trace.
   */
  public constructor(
    statusCode: number = 500,
    message: string = "Something went wrong",
    errors: unknown[] = [],
    stack: string = "",
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      // Study this more
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

class BadRequestException extends ApiError {
  /**
   * Construct a BadRequestException object.
   *
   * @param  message - The error message for the exception. Defaults to a generic
   *                   message for bad requests.
   */
  constructor(message: string = HTTP_ERROR_MESSAGES.BadRequest) {
    super(HTTP_STATUS_CODES.BadRequest, message);
  }
}

class ConflictException extends ApiError {
  /**
   * Construct a ConflictException object.
   *
   * @param  message - The error message for the exception. Defaults to a generic
   *                   message for conflicts.
   */
  constructor(message: string = HTTP_ERROR_MESSAGES.Conflict) {
    super(HTTP_STATUS_CODES.Conflict, message);
  }
}

class InternalServerErrorException extends ApiError {
  /**
   * Construct an InternalServerErrorException object.
   *
   * @param  message - The error message for the exception. Defaults to a generic
   *                   message for internal server errors.
   */
  constructor(message: string = HTTP_ERROR_MESSAGES.InternalServerError) {
    super(HTTP_STATUS_CODES.InternalServerError, message);
  }
}
class NotFoundException extends ApiError {
  /**
   * Construct an UnauthorizedException object.
   *
   * @param  message - The error message for the exception. Defaults to a generic
   *                   message for unauthorized requests.
   */
  constructor(message: string = HTTP_ERROR_MESSAGES.Unauthorized) {
    super(HTTP_STATUS_CODES.Unauthorized, message);
  }
}

class UnauthorizedException extends ApiError {
  /**
   * Construct an UnauthorizedException object.
   *
   * @param  message - The error message for the exception. Defaults to a generic
   *                   message for unauthorized requests.
   */
  constructor(message: string = HTTP_ERROR_MESSAGES.NotFound) {
    super(HTTP_STATUS_CODES.NotFound, message);
  }
}
export {
  ApiError,
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
};
