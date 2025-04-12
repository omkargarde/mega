// HTTP Response Status Codes
const HTTP_STATUS_CODES = {
  Accepted: 202,
  BAD_REQUEST: 400,
  BadGateway: 502,
  BadRequest: 400,
  CONFLICT: 409,
  Conflict: 409,
  CREATED: 201,
  Created: 201,
  FORBIDDEN: 403,
  Forbidden: 403,
  Found: 302,
  GatewayTimeout: 504,
  Gone: 410,
  INTERNAL_SERVER_ERROR: 500,
  InternalServerError: 500,
  MethodNotAllowed: 405,
  MovedPermanently: 301,
  MultipleChoices: 300,
  NO_CONTENT: 204,
  NoContent: 204,
  NOT_FOUND: 404,
  NotFound: 404,
  NotImplemented: 501,
  OK: 200,
  Ok: 200,
  PartialContent: 206,
  PaymentRequired: 402,
  RequestTimeout: 408,
  SERVICE_AVAILABLE: 200,
  SERVICE_UNAVAILABLE: 503,
  ServiceUnavailable: 503,
  TooManyRequests: 429,
  UNAUTHORIZED: 401,
  Unauthorized: 401,
  UNPROCESSABLE_ENTITY: 422,
  UnprocessableEntity: 422,
};

// HTTP Response Status Messages
const HTTP_STATUS_MESSAGES = {
  BAD_REQUEST: "Bad Request",
  CREATED: "Created",
  FORBIDDEN: "Forbidden",
  NO_CONTENT: "No Content",
  NOT_FOUND: "Not Found",
  OK: "OK",
  SERVICE_AVAILABLE: "Service available",
  UNAUTHORIZED: "Unauthorized",
};

// HTTP Response Error Messages
const HTTP_ERROR_MESSAGES = {
  BAD_REQUEST: "Invalid request",
  CONFLICT: "Resource already exists",
  FORBIDDEN: "Access denied",
  INTERNAL_SERVER_ERROR: "Internal server error",
  NOT_FOUND: "Resource not found",
  SERVICE_UNAVAILABLE: "Service unavailable",
  UNAUTHORIZED: "Authentication failed",
  UNPROCESSABLE_ENTITY: "Unable to process request",
};

export { HTTP_ERROR_MESSAGES, HTTP_STATUS_CODES, HTTP_STATUS_MESSAGES };
