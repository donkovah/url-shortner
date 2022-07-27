const TYPES = {
  URLService: Symbol("URLService"),
  IUrlRepository: Symbol("IUrlRepository"),
  IUrlEntity: Symbol("IUrlEntity"),
  IStatEntity: Symbol("IStatEntity"),
};

export default TYPES;

export type Config = {
  env: string;
  port: string;
  host: string;
  storage: string;
  dbUrl: string;
  dbName: string;
  redisHost: string;
};

export type UrlBodyParams = {
  longUrl: string;
  shortUrl?: string;
};

export interface UrlBaseParams {
  shortUrl: string;
  longUrl: string;
}
