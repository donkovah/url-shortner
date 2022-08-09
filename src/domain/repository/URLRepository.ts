import { inject, injectable } from "inversify";
import "reflect-metadata";
import { IUrlEntity, IStatEntity } from "../contracts/index";
import TYPES, { UrlAttribute, UrlBaseParams } from "../../shared/types";
import { Stats, Url } from "../types";

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

  async getUrls(): Promise<UrlAttribute[]> {
    const urls = this.urlEntity.getUrls();
    return urls;
  }
  async getUrl(key: string): Promise<UrlAttribute> {
    const url = this.urlEntity.getUrl(key);
    return url;
  }

  async getUrlStats(key: string): Promise<Stats[]> {
    const url = await this.statsEntity.getStats(key);
    return url;
  }

  async updateUrlStats(key: string): Promise<void> {
    return this.statsEntity.updateStats(key);
  }

  async storeUrl(body: UrlBaseParams): Promise<void> {
    return this.urlEntity.storeUrl(body);
  }
}
