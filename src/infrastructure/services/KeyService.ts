import { injectable, inject } from "inversify";
import "reflect-metadata";
import { IKeyService } from "../contracts/IKeyService";

@injectable()
export class KeyService implements IKeyService {
  private static hashKeys: string[];

  getKey(): string {
    return "url";
  }

  storeKeys(): void {
    console.log("storing keys");
  }
}
