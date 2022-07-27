import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import "./application/routes/URL";
import iocContainer from "./inversify.config";
import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import { makeLoggerMiddleware } from "inversify-logger-middleware";
import { Handlers } from "./application/handlers/ResponseHandler";
import {
  ValidationException,
  RecordNotFoundException,
  RecordAlreadyExistException,
} from "./shared/Errors";

if (process.env.NODE_ENV === "development") {
  const logger = makeLoggerMiddleware();
  iocContainer.applyMiddleware(logger);
}
// start the server
const server = new InversifyExpressServer(iocContainer);
server.setErrorConfig((app) => {
  app.use(
    (
      err: ErrorRequestHandler,
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      if (err instanceof ValidationException) {
        return Handlers.onValidationFailed(res, err.message);
      }

      if (err instanceof RecordNotFoundException) {
        return Handlers.onNotFound(res);
      }

      if (err instanceof RecordAlreadyExistException) {
        return Handlers.onValidationFailed(res, err.message);
      }

      if (err) {
        console.log(err);

        return Handlers.onServerError(res);
      }
      next();
    }
  );
});

server.setConfig((app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
});

/**
 * Start Express server.
//  */
const app = server.build();

export default app;
