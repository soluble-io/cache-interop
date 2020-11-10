const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { defaults: tsjPreset } = require('ts-jest/presets');
const { compilerOptions } = require('./tsconfig');

/** @typedef {import('ts-jest')} */
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  name: 'e2e',
  displayName: 'e2e',
  testRunner: 'jest-circus/runner',
  setupFilesAfterEnv: ['<rootDir>/cache-e2e-tests/jest.setup.js'],
  verbose: true,
  /*
  transform: {
    ...tsjPreset.transform,
  },*/
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|ts)$'],
  rootDir: '../',
  testMatch: ['<rootDir>/cache-e2e-tests/**/*.test.ts'],
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  /*
  moduleNameMapper: {
    '../../cache-interop/src': '<rootDir>/cache-interop/src',
    '^@soluble/cache\\-interop$': '<rootDir>/cache-interop/src',
    '^@soluble/cache\\-interop/(.*)$': '<rootDir>/cache-interop/src/$1',
  },
  */
  coverageDirectory: '<rootDir>/cache-e2e-tests/coverage',
  collectCoverageFrom: [
    '<rootDir>/cache-interop/src/**/*.{ts,js}',
    '<rootDir>/cache-ioredis/src/**/*.{ts,js}',
    '!**/*.test.ts',
  ],
  globals: {
    'ts-jest': {
      diagnostics: true,
      tsconfig: './tsconfig.json',
    },
  },
};
module.exports = config;
