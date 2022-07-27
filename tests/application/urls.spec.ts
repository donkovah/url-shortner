import request from "supertest";
import app from "../../src/app";
import { faker } from "@faker-js/faker";

describe("Test URL Endpoints", () => {
  it("It should respond with success code", async () => {
    const longUrl = `http://${faker.internet.domainName()}`;
    const response = await request(app)
      .post("/url/")
      .send({
        longUrl,
      })
      .set("Accept", "application/json");
    expect(response.statusCode).toBe(200);
  });

  it("It should respond with validation error", async () => {
    const longUrl = faker.internet.domainName();
    const response = await request(app)
      .post("/url/")
      .send({
        longUrl,
      })
      .set("Accept", "application/json");
    expect(response.statusCode).toBe(400);
  });

  it("It should respond with validation error with invalid body parameters", async () => {
    const shortUrl = faker.unique.name;
    const longUrl = faker.internet.domainName();
    const response = await request(app)
      .post("/url")
      .send({
        shortUrl,
        invalidBody: longUrl,
      })
      .set("Accept", "application/json");
    expect(response.statusCode).toBe(400);
  });

  it("It should respond with success and url stats", async () => {
    const shortUrl = faker.unique.name;
    const response = await request(app)
      .get(`/url/${shortUrl}/stats`)
      .set("Accept", "application/json");

    expect(response.statusCode).toBe(200);
  });

  it("It should respond with succes when sending desired url key", async () => {
    const response = await request(app).get("/url");
    expect(response.statusCode).toBe(200);
  });
});
