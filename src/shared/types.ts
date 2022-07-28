const TYPES = {
  URLService: Symbol("URLService"),
  IUrlRepository: Symbol("IUrlRepository"),
  IUrlEntity: Symbol("IUrlEntity"),
  IStatEntity: Symbol("IStatEntity"),
};

export default TYPES;

export type Config = {
  env: any;
  port: any;
  host: any;
  storage: any;
  dbUrl: any;
  dbName: any;
  redisHost: any;
};

export type UrlBodyParams = {
  longUrl: string;
  shortUrl?: string;
};

export interface UrlBaseParams {
  shortUrl: string;
  longUrl: string;
}
