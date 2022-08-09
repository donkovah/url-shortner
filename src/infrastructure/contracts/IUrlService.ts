import { UrlAttribute, UrlBodyParams } from "../../shared/types";
import { Stats } from "../../domain/types/index";

export interface IUrlService {
  getUrls(): Promise<UrlAttribute[]>;
  getUrl(key: string): UrlAttribute;
  getUrlStats(key: string): Stats;
  clickedUrl(key: string): string;
  storeUrl(key: UrlBodyParams): void;
}
