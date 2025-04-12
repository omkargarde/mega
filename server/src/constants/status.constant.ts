// HTTP Response Status Codes
const HTTP_STATUS_CODES = {
  BAD_REQUEST: 400,
  CONFLICT: 409,
  CREATED: 201,
  FORBIDDEN: 403,
  INTERNAL_SERVER_ERROR: 500,
  NO_CONTENT: 204,
  NOT_FOUND: 404,
  OK: 200,
  SERVICE_AVAILABLE: 200,
  SERVICE_UNAVAILABLE: 503,
  UNAUTHORIZED: 401,
  UNPROCESSABLE_ENTITY: 422,
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
