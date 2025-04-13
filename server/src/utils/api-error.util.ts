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

export { ApiError };
