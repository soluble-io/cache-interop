// @ts-check
'use strict';

const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { defaults: tsjPreset } = require('ts-jest/presets');
const { compilerOptions } = require('./tsconfig.jest.json');

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
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|ts)$'],
  testMatch: ['<rootDir>/cache-redis/src/**/*.test.ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
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
