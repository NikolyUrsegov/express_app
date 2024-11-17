/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: "__tests__/.*.e2e.test.ts$",
  testTimeout: 100000,
  globalSetup: './__tests__/globalSetup.ts',
  globalTeardown: './__tests__/globalTeardown.ts',
}