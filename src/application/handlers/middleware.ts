import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import { Handlers } from "./ResponseHandler";
import { RecordNotFoundException,  ValidationException } from '../../shared/Errors';

export const errorHandlerMiddleware = (
  err: ErrorRequestHandler,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ValidationException) {
    return Handlers.onValidationFailed(res, err.message);
  }

  if (err instanceof RecordNotFoundException) {
    return Handlers.onNotFound(res);
  }

  if (err){
    return Handlers.onServerError(res);
  }
  next();
}
