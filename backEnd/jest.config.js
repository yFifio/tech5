module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.test.ts"],
  setupFilesAfterEnv: ["./src/test/setup.ts"],
  globalTeardown: "./src/test/teardown.ts",
};
