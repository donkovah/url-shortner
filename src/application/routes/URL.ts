import {
  controller,
  httpGet,
  httpPost,
  request,
  response,
} from "inversify-express-utils";
import { inject } from "inversify";
import { Request, Response } from "express";
import TYPES from "../../shared/types";
import { IUrlService } from "../../infrastructure/contracts/IUrlService";
import { statsValidator, urlValidator } from "../validatior/urlValidator";
import { requestMapper } from "../utils";
import { Handlers } from "../handlers/ResponseHandler";

@controller("/url")
export class URLController {
  constructor(@inject(TYPES.URLService) private urlService: IUrlService) {}

  @httpGet("/")
  public async getUrls(
    @response() res: Response
  ): Promise<Response<any, Record<string, any>>> {
    const urls = await this.urlService.getUrls();
    return Handlers.onSuccess(res, urls);
  }

  @httpGet("/:id")
  public async redirectToLongUrl(
    @request() req: Request,
    @response() res: Response
  ): Promise<Response<any, Record<string, any>> | void> {
    const url = await this.urlService.clickedUrl(req.params.id);
    if (!url) {
      return Handlers.onNotFound(res);
    }
    return Handlers.onSuccessRedirect(res, url.longUrl);
  }

  @httpGet("/:id/detail")
  public async getUrl(
    @request() req: Request,
    @response() res: Response
  ): Promise<Response<any, Record<string, any>>> {
    const url = await this.urlService.getUrl(req.params.id);
    if (!url) {
      return Handlers.onNotFound(res);
    }
    return Handlers.onSuccess(res, url);
  }

  @httpGet("/:id/stats", statsValidator)
  public async getUrlStats(
    @request() req: Request,
    @response() res: Response
  ): Promise<Response<any, Record<string, any>>> {
    const url = await this.urlService.getUrlStats(req.params.id);
    if (!url) {
      return Handlers.onNotFound(res);
    }
    return Handlers.onSuccess(res, url);
  }

  @httpPost("/", urlValidator)
  public async newUrl(
    @request() req: Request,
    @response() res: Response
  ): Promise<Response<any, Record<string, any>>> {
    const body = requestMapper(req);
    const urls = await this.urlService.storeUrl(body);
    return res.status(200).json(urls);
  }
}
