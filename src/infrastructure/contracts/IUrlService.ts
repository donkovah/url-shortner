import { UrlBodyParams } from "../../shared/types";

export interface IUrlService {
  getUrls(): any;
  getUrl(key: string): any;
  getUrlStats(key: string): any;
  clickedUrl(key: string): any;
  storeUrl(key: UrlBodyParams): any;
}
