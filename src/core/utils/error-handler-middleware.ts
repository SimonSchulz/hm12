import { Request, Response, NextFunction } from 'express';
import { AppError } from "./app-response-errors";
import { HttpStatus } from "../types/http-statuses";

export function errorHandlerMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  return res.status(HttpStatus.InternalServerError).json({ message: 'Internal Server Error' });
}