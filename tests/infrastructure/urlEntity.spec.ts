import { UrlEntity } from "../../src/domain/models/urlEntity";

describe("Url Entity", () => {
  const urlEntity = new UrlEntity();
  const url = {
    shortUrl: "someUrl-with-P",
    longUrl: "someUrl-with-SK",
  };

  beforeAll(async () => {
    await urlEntity.storeUrl(url);
  });

  it("Get Urls in db", async () => {
    const urls = await urlEntity.getUrls();
    expect(urls.length).toBeGreaterThan(0);
  });

  it("Get Url Entity", async () => {
    const urlRecord = await urlEntity.getUrl(url.shortUrl);
    console.log(urlRecord);
    expect(urlRecord).toBeDefined();
  });
});
