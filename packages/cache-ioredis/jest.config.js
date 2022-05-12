// @ts-check

const { defaults: tsPreset } = require('ts-jest/presets');
const { pathsToModuleNameMapper } = require('ts-jest');

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
  displayName: 'cache-ioredis/unit',
  testRunner: 'jest-circus/runner',
  testEnvironment: 'node',
  verbose: true,
  transform: {
    ...tsPreset.transform,
  },
  rootDir: '../',

  testMatch: ['<rootDir>/cache-ioredis/src/**/*.test.ts'],
  moduleNameMapper: {
    ...getTsConfigBasePaths(),
  },
  coverageDirectory: '<rootDir>/cache-ioredis/coverage',
  collectCoverageFrom: [
    '<rootDir>/cache-ioredis/src/**/*.{ts,js}',
    '!**/*.test.ts',
    '!**/index.ts',
    '!**/*.d.ts',
  ],
  globals: {
    'ts-jest': {
      diagnostics: true,
      tsconfig: './tsconfig.jest.json',
    },
  },
};
module.exports = config;
