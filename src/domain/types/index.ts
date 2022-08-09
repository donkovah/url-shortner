export interface Url {
  shortUrl: string;
  longUrl: string;
  createdAt?: string;
}

export interface Stats {
  shortUrl: string;
  created?: string;
}

export type UrlStats = {
  shortUrl: string;
  clicks: number;
  details: Array<StatsDetails>;
};

type StatsDetails = {
  created: Date;
  hit: boolean;
  shortUrl: string;
  modified: Date;
  entity: string;
};
