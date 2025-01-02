const HttpStatus = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  SERVICE_UNAVAILABLE: 503,
};

export const ErrorCode = {
  UNAUTHORIZED: {
    message: "Unauthorized",
    statusCode: HttpStatus.UNAUTHORIZED,
    desc: "You are not authorized to access this resource",
  },

  EMPTY_INPUT: {
    message: "Input field cannot be empty",
    statusCode: HttpStatus.BAD_REQUEST,
    desc: "The input is empty",
  },

  INVALID_OTP: {
    message: "Invalid OTP",
    statusCode: HttpStatus.BAD_REQUEST,
    desc: "The OTP you entered is invalid",
  },

  PAGE_NOT_FOUND: {
    message: "Page not found",
    statusCode: HttpStatus.NOT_FOUND,
    desc: "The page you're looking for doesn't exist",
  },

  TOKEN_MISSING: {
    message: "Token missing",
    statusCode: HttpStatus.UNAUTHORIZED,
    desc: "Unauthorized access",
  },

  INVALID_TOKEN: {
    message: "Invalid token",
    statusCode: HttpStatus.UNAUTHORIZED,
    desc: "The token is invalid",
  },

  SERVER_ERROR: {
    message: "Internal server error",
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    desc: "Something went wrong",
  },
};
