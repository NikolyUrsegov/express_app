/** @type {import('ts-jest').JestConfigWithTsJest} */
// eslint-disable-next-line no-undef
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '__tests__/.*.e2e.test.ts$',
  testTimeout: 100000,
  moduleNameMapper: {
    '^@root(.*)$': '<rootDir>/src$1',
    '^@common(.*)$': '<rootDir>/src/common$1',
    '^@db(.*)$': '<rootDir>/src/db$1'
  }
}