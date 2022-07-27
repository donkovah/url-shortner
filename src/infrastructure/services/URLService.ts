import { injectable, inject } from "inversify";
import "reflect-metadata";
import { IUrlRepository } from "../../domain/contracts";
import TYPES, { UrlBaseParams, UrlBodyParams } from "../../shared/types";
import { IUrlService } from "../contracts/IUrlService";
import { RecordAlreadyExistException } from "../../shared/Errors";

@injectable()
export class URLService implements IUrlService {
  private urlRepository: IUrlRepository;

  public constructor(
    @inject(TYPES.IUrlRepository) urlRepository: IUrlRepository
  ) {
    this.urlRepository = urlRepository;
  }

  async getUrls(): Promise<any> {
    const urls = await this.urlRepository.getUrls();
    return urls;
  }

  async getUrl(key: string): Promise<any> {
    const url = await this.urlRepository.getUrl(key);
    return url;
  }

  async clickedUrl(key: string): Promise<any> {
    const url = await this.urlRepository.getUrl(key);
    await this.urlRepository.updateUrlStats(key);
    return url;
  }

  async getUrlStats(key: string): Promise<any> {
    const url = await this.urlRepository.getUrlStats(key);
    const urlResponseObj = {
      shortUrl: key,
      clicks: url.length,
      details: url,
    };
    return urlResponseObj;
  }

  async storeUrl(reqBody: UrlBodyParams): Promise<UrlBodyParams> {
    const body = reqBody as unknown as UrlBaseParams;
    if (body?.shortUrl) {
      const urlExist = await this.urlRepository.getUrl(body.shortUrl);
      if (urlExist) {
        throw new RecordAlreadyExistException(
          `${body.shortUrl} is already taken`
        );
      }
    } else {
      body.shortUrl = `some-generated-url`;
    }
    await this.urlRepository.storeUrl(body);
    return body;
  }
}
