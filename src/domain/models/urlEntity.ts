import { Entity } from "dynamodb-toolbox";
import { injectable } from "inversify";
import { IUrlEntity } from "../contracts";
import { Url } from "../types";
import { createUrlTable } from "./table";
import "reflect-metadata";
import { config } from "../../config";

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

  async getUrls(): Promise<Url[]> {
    const urls = (
      await this.repo.scan({
        filters: [{ attr: "longUrl", exists: true }],
      })
    ).Items as unknown as Url[];
    return urls;
  }

  async getUrl(key: string): Promise<Url> {
    const url = await this.repo.query(`URLKEY#${key}`, {
      filters: [{ attr: "longUrl", exists: true }],
    });

    return url.Items[0] as Url;
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
