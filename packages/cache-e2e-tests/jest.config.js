// @ts-check

const { pathsToModuleNameMapper } = require('ts-jest');

const { getJestCachePath } = require('../../cache.config');
const {
  compilerOptions: { paths: tsConfigPaths },
} = require('../../tsconfig.paths.json');

// Take the paths from tsconfig automatically from base tsconfig.json
// @link https://kulshekhar.github.io/ts-jest/docs/paths-mapping
const getTsConfigBasePaths = () => {
  return tsConfigPaths
    ? pathsToModuleNameMapper(tsConfigPaths, {
        prefix: '<rootDir>/tricky-false-path-to-remove-parent/packages',
      })
    : {};
};

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const config = {
  displayName: 'cache-e2e-tests',
  cacheDirectory: getJestCachePath('cache-e2e-tests'),
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/cache-e2e-tests/test/setup/jest.setup.ts'],
  verbose: true,
  transform: {
    '^.+\\.m?[tj]sx?$': [
      'ts-jest',
      {
        tsconfig: './tsconfig.json',
      },
    ],
  },
  moduleNameMapper: {
    ...getTsConfigBasePaths(),
  },
  rootDir: '../',
  modulePathIgnorePatterns: ['/_release'],
  testMatch: ['<rootDir>/cache-e2e-tests/**/*.test.ts'],
  coverageDirectory: '<rootDir>/cache-e2e-tests/coverage',
  collectCoverageFrom: [
    '<rootDir>/cache-interop/src/**/*.{ts,js}',
    '<rootDir>/cache-ioredis/src/**/*.{ts,js}',
    '<rootDir>/cache-redis/src/**/*.{ts,js}',
    '<rootDir>/dsn-parser/src/**/*.{ts,js}',
    '!**/*.test.ts',
    '!**/*.d.ts',
    '!**/index.ts',
  ],
};

module.exports = config;
