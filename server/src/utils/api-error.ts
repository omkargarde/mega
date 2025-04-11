class ApiError extends Error {
  protected errors;
  protected statusCode: number;
  protected success = false;
  /**
   * Construct an ApiError object.
   *
   * @param {number} statusCode - The HTTP status code for the error.
   * @param {string} [message="Something went wrong"] - The error message.
   * @param {Error[]} [errors=[]] - An array of error objects.
   * @param {string} [stack=""] - The error stack trace.
   */
  public constructor(
    statusCode: number,
    message = "Something went wrong",
    errors: unknown[] = [],
    stack = "",
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

export { ApiError };
