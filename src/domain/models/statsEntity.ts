import { Entity } from "dynamodb-toolbox";
import { injectable } from "inversify";
import { IStatEntity } from "../contracts";
import { createUrlTable } from "./table";
import { Stats } from "../types/index";
import "reflect-metadata";

@injectable()
export class StatsEntity implements IStatEntity {
  private repo = new Entity({
    name: "Stats",
    attributes: {
      PK: {
        hidden: true,
        partitionKey: true,
        type: "string",
        prefix: "URLKEY#",
      },
      SK: { hidden: true, sortKey: true, type: "string", prefix: "URLKEY#" },
      shortUrl: "string",
      hit: "boolean",
    },
    table: createUrlTable(),
  });

  async getStats(key: string): Promise<Stats[]> {
    const filterConditions = [{ attr: "hit", exists: true }] as any;
    const url = (
      await this.repo.query(`URLKEY#${key}`, {
        filters: filterConditions,
      })
    ).Items as unknown as Stats[];
    return url;
  }

  async updateStats(shortUrl: string): Promise<void> {
    await this.repo.put({
      PK: shortUrl,
      SK: `shortUrl${new Date().toJSON()}`,
      shortUrl,
      hit: true,
    });
  }
}
