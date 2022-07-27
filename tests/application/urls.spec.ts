import request from "supertest";
import app from "../../src/server";
import { faker } from "@faker-js/faker";
// import serverInstance from "../../src/server";

describe("Test URL Endpoints", () => {
  it.only("It should respond with success with valid params", async () => {
    const longUrl = faker.internet.domainName;
    const response = await request(app)
      .post("/url/")
      .send({
        longUrl,
      })
      .set("Accept", "application/json");
    console.log("here");
    expect(response.statusCode).toBe(200);
  });

  it("It should respond with succes when sending desired url key", async () => {
    const shortUrl = faker.unique.name;
    const longUrl = faker.internet.domainName;
    const response = await request(app)
      .post("/api/auth/urls")
      .send({
        shortUrl,
        longUrl,
      })
      .set("Accept", "application/json");
    expect(response.statusCode).toBe(200);
  });

  it("It should respond with validation error with invalid body parameters", async () => {
    const shortUrl = faker.unique.name;
    const longUrl = faker.internet.domainName;
    const response = await request(app)
      .post("/api/auth/urls")
      .send({
        shortUrl,
        longUrl,
      })
      .set("Accept", "application/json");
    expect(response.statusCode).toBe(200);
  });

  it("It should respond with success and url stats", async () => {
    const shortUrl = faker.unique.name;
    const response = await request(app)
      .get(`/api/auth/${shortUrl}`)
      .set("Accept", "application/json");

    expect(response.statusCode).toBe(200);
  });
});
