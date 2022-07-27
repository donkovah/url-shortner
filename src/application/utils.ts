import { Request } from "express";
import { UrlBodyParams } from "../shared/types";

export const requestMapper = (req: Request): UrlBodyParams => ({
  longUrl: req.body.longUrl,
  ...(req.body.shortUrl && { shortUrl: req.body.shortUrl }),
});
