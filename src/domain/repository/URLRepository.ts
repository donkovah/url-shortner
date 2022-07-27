import { inject, injectable } from "inversify";
import "reflect-metadata";
import { IUrlEntity, IStatEntity } from "../contracts/index";
import TYPES, { UrlBaseParams } from "../../shared/types";

@injectable()
export class URLRepository {
  private urlEntity: IUrlEntity;
  private statsEntity: IStatEntity;

  public constructor(
    @inject(TYPES.IUrlEntity) urlrep: IUrlEntity,
    @inject(TYPES.IStatEntity) statrep: IStatEntity
  ) {
    this.urlEntity = urlrep;
    this.statsEntity = statrep;
  }

  async getUrls(): Promise<any> {
    const urls = await this.urlEntity.getUrls();
    return urls;
  }
  async getUrl(key: string): Promise<any> {
    const url = await this.urlEntity.getUrl(key);
    return url;
  }

  async getUrlStats(key: string): Promise<any> {
    const url = await this.statsEntity.getStats(key);
    return url;
  }

  async updateUrlStats(key: string): Promise<any> {
    console.log("stats");

    const url = await this.statsEntity.updateStats(key);
    return url;
  }

  async storeUrl(body: UrlBaseParams): Promise<any> {
    return this.urlEntity.storeUrl(body);
    console.log("some", body);
  }
}
