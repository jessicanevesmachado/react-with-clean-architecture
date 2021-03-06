module.exports = {
  roots: ["<rootDir>/src"],
  collectCoverageFrom: ["<rootDir>/src/**/*.{ts,tsx}", "!**/*.d.ts"],
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  transform: {
    ".+\\.(ts|tsx)$": "ts-jest",
  },
  moduleNameMapper: {
    "@data/(.*)": "<rootDir>/src/data/$1",
    "@domain/(.*)": "<rootDir>/src/domain/$1",
    "\\.scss$": "identity-obj-proxy",
  },
};
