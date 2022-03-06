// @ts-check

const { defaults: tsPreset } = require('ts-jest/presets');

/** @typedef {import('ts-jest/dist/types')} */
/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  name: 'cache-dsn-parser/unit',
  displayName: 'cache-dsn-parser/unit',
  testRunner: 'jest-circus/runner',
  verbose: true,
  collectCoverageFrom: ['src/**/*.{js,ts}', '!src/**/*.d.ts', '!src/**/*.test.ts', '!/src/**/index.ts'],
  testMatch: ['<rootDir>/src/**/*.test.ts'],
  testEnvironment: 'node',
  transform: {
    ...tsPreset.transform,
  },

  modulePaths: [],
  globals: {
    'ts-jest': {
      diagnostics: true,
      tsconfig: './tsconfig.jest.json',
    },
  },
};
