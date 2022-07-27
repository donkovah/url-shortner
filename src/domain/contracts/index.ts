import { Url } from "../types";
import { UrlBaseParams } from "../../shared/types";

export interface IUrlRepository {
  getUrls(): any;
  getUrl(key: string): any;
  storeUrl(key: UrlBaseParams): any;
  getUrlStats(key: string): any;
  updateUrlStats(key: string): any;
}

export interface IStatEntity {
  getStats(key: string): any;
  updateStats(key: string): any;
}

export interface IUrlEntity {
  getUrls(): any;
  getUrl(key: string): any;
  storeUrl(param: Url): any;
}
