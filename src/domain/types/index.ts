export type UrlAttribute = {
  id?: string;
  longUrl: string;
  shortUrl: string;
};

export interface Url {
  shortUrl: string;
  longUrl: string;
  createdAt?: string;
}

export interface Stats {
  shortUrl: string;
  created?: string;
}
