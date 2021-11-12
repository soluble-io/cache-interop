// @ts-check
'use strict';

const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { defaults: tsjPreset } = require('ts-jest/presets');

const {
  compilerOptions: { paths: tsConfigPaths },
} = require('../../tsconfig.paths.json');

// Take the paths from tsconfig automatically from base tsconfig.json
// @link https://kulshekhar.github.io/ts-jest/docs/paths-mapping
const getTsConfigBasePaths = () => {
  return tsConfigPaths
    ? pathsToModuleNameMapper(tsConfigPaths, {
        prefix: '<rootDir>/packages/',
      })
    : {};
};

/** @typedef {import('ts-jest/dist/types')} */
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  name: 'cache-redis/unit',
  displayName: 'cache-redis/unit',
  testRunner: 'jest-circus/runner',
  testEnvironment: 'node',
  verbose: true,
  transform: {
    ...tsjPreset.transform,
  },
  rootDir: '../',

  testMatch: ['<rootDir>/cache-redis/src/**/*.test.ts'],
  moduleNameMapper: {
    ...getTsConfigBasePaths(),
  },
  coverageDirectory: '<rootDir>/cache-redis/coverage',
  collectCoverageFrom: ['<rootDir>/cache-redis/src/**/*.{ts,js}', '!**/*.test.ts', '!**/index.ts', '!**/*.d.ts'],
  globals: {
    'ts-jest': {
      diagnostics: true,
      tsconfig: './tsconfig.jest.json',
    },
  },
};

module.exports = config;
