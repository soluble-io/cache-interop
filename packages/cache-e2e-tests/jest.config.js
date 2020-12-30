const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { defaults: tsjPreset } = require('ts-jest/presets');
const { compilerOptions } = require('./tsconfig');

/** @typedef {import('ts-jest')} */
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  name: 'cache-e2e',
  displayName: 'cache-e2e',
  testRunner: 'jest-circus/runner',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/cache-e2e-tests/config/jest.setup.ts'],
  verbose: true,
  transform: {
    ...tsjPreset.transform,
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|ts)$'],
  rootDir: '../',
  testMatch: ['<rootDir>/cache-e2e-tests/**/*.test.ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
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
  globals: {
    'ts-jest': {
      diagnostics: true,
      tsconfig: './tsconfig.json',
    },
  },
};
module.exports = config;
