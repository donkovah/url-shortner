// eslint-disable-next-line no-undef
module.exports = {
  roots: ["<rootDir>"],
  globalSetup: "./jest.global.setup.ts",
  testMatch: ["**/*.spec.ts"],
  preset: "ts-jest",
  testEnvironment: "node",
};
