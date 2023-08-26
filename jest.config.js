/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // testTimeout: 30000,
  testTimeout: 60000, //60 seconds


  // coveragePathIgnorePatterns: ["/node_modules/"],
  // coverageProvider: "v8",
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  // testPathIgnorePatterns: ["/node_modules/"],

};
