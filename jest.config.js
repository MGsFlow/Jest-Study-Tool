const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

/** @type {import('jest').Config} */
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  testMatch: ["**/__tests__/**/*.test.[jt]s?(x)"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/app/**",
    "!**/*.d.ts",
  ],
};

module.exports = createJestConfig(customJestConfig);
