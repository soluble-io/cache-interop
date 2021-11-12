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
        prefix: '<rootDir>/',
      })
    : {};
};

/** @typedef {import('ts-jest/dist/types')} */
/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  name: 'cache-interop/unit',
  displayName: 'cache-interop/unit',
  testRunner: 'jest-circus/runner',
  verbose: true,
  collectCoverageFrom: ['src/**/*.{js,ts}', '!src/**/*.d.ts', '!src/**/*.test.ts', '!**/index.ts'],
  testMatch: ['<rootDir>/src/**/*.test.ts'],
  testEnvironment: 'node',
  transform: {
    ...tsjPreset.transform,
  },
  moduleNameMapper: {
    ...getTsConfigBasePaths(),
  },
  modulePaths: [],
  globals: {
    'ts-jest': {
      diagnostics: true,
      tsconfig: './tsconfig.jest.json',
    },
  },
};
