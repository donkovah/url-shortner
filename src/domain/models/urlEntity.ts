import { Entity } from "dynamodb-toolbox";
import { injectable } from "inversify";
import { IUrlEntity } from "../contracts";
import { Url } from "../types";
import { createUrlTable } from "./table";
import "reflect-metadata";
import { config } from "../../config";
import { UrlAttribute } from "../../shared/types";

@injectable()
export class UrlEntity implements IUrlEntity {
  private repo = new Entity({
    name: "Url",
    attributes: {
      PK: {
        hidden: true,
        partitionKey: true,
        type: "string",
        prefix: "URLKEY#",
      },
      SK: { hidden: true, sortKey: true, type: "string", prefix: "URL#" },
      shortUrl: "string",
      longUrl: "string",
    },
    table: createUrlTable(),
  });

  async getUrls(): Promise<UrlAttribute[]> {
    const urls = (
      await this.repo.scan({
        filters: [{ attr: "longUrl", exists: true }],
      })
    ).Items as unknown as UrlAttribute[];
    return urls;
  }

  async getUrl(key: string): Promise<UrlAttribute> {
    const url = await this.repo.query(`URLKEY#${key}`, {
      filters: [{ attr: "longUrl", exists: true }],
    });

    return url.Items[0] as UrlAttribute;
  }

  async storeUrl(params: Url): Promise<void> {
    await this.repo.put({
      PK: params.shortUrl,
      SK: params.longUrl,
      ...params,
      shortUrl: `${config.host}:${config.port}/${params.shortUrl}`,
    });
  }
}
