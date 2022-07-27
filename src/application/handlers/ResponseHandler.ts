import { Response } from "express";
import HttpStatus from "http-status";

export class Handlers {
  public static onSuccess(res: Response, data: Record<string, any>): Response {
    return res.status(HttpStatus.OK).json(data);
  }

  public static onSuccessRedirect(res: Response, data: string): void {
    return res.redirect(data);
  }

  public static onValidationFailed(res: Response, message: string): Response {
    return res.status(HttpStatus.BAD_REQUEST).json({ message });
  }

  public static onNotFound(res: Response): Response {
    return res
      .status(HttpStatus.NOT_FOUND)
      .json({ message: `The endpoint does not exist` });
  }

  public static onServerError(res: Response): Response {
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: `Oops, something went wrong from our side.` });
  }
}
