import { HttpStatus } from "../types/http-statuses";

export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Not Found") {
    super(HttpStatus.NotFound, message);
  }
}

export class ValidationError extends AppError {
  constructor(message = "Validation failed") {
    super(HttpStatus.BadRequest, message);
  }
}
export class AuthorizationError extends AppError {
  constructor(message = "Unauthorized") {
    super(HttpStatus.Unauthorized, message);
  }
}
export class ForbiddenError extends AppError {
  constructor(message = "Access denied") {
    super(HttpStatus.Forbidden, message);
  }
}

