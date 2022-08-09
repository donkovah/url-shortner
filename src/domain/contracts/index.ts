import { Stats, UrlStats } from "../types";
import { UrlAttribute, UrlBaseParams } from "../../shared/types";

export interface IUrlRepository {
  getUrls(): UrlAttribute[];
  getUrl(key: string): UrlAttribute;
  storeUrl(key: UrlBaseParams): UrlAttribute;
  getUrlStats(key: string): UrlStats;
  updateUrlStats(key: string): UrlAttribute;
}

export interface IStatEntity {
  getStats(key: string): Promise<Stats[]>;
  updateStats(key: string): void;
}

export interface IUrlEntity {
  getUrls(): Promise<UrlAttribute[]>;
  getUrl(key: string): Promise<UrlAttribute>;
  storeUrl(param: UrlAttribute): Promise<void>;
}
