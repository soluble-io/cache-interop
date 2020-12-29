const { defaults: tsjPreset } = require('ts-jest/presets');

/** @typedef {import('ts-jest')} */
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
    ...tsjPreset.transform,
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$', '^.+\\.module\\.(css|sass|scss|less)$'],
  modulePaths: [],
  globals: {
    'ts-jest': {
      diagnostics: true,
      tsconfig: './tsconfig.jest.json',
    },
  },
};
