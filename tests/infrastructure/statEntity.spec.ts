import { StatsEntity } from "../../src/domain/models/statsEntity";

describe("Url Entity", () => {
  const urlEntity = new StatsEntity();
  const url = {
    shortUrl: "stat-someUrl",
  };

  beforeAll(async () => {
    await urlEntity.updateStats(url.shortUrl);
  });

  it("Get Url Entity", async () => {
    const urlRecord = await urlEntity.getStats(url.shortUrl);
    expect(urlRecord).toBeDefined();
  });
});
