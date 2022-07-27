import * as dotenv from "dotenv";
import { Config } from "./shared/types";

const envFile = process.env.NODE_ENV == "test" ? `.env.test` : `.env`;

dotenv.config({ path: envFile });

export const config: Config = {
  env: process.env.NODE_ENV,
  host: process.env.HOST,
  port: process.env.PORT ?? "3000",
  storage: process.env.STORAGE ?? "db",
  dbUrl: process.env.DB_URL,
  dbName: process.env.DB_NAME,
  redisHost: process.env.REDIS_HOST,
};
