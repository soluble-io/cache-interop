const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { defaults: tsjPreset } = require('ts-jest/presets');
const { compilerOptions } = require('./tsconfig.jest.json');

console.log('cool', pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }));

/** @typedef {import('ts-jest')} */
/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  name: 'cache-ioredis/unit',
  displayName: 'cache-ioredis/unit',
  testRunner: 'jest-circus/runner',
  verbose: true,
  collectCoverageFrom: ['src/**/*.{js,ts}', '!src/**/*.d.ts', '!src/**/*.test.ts'],
  moduleFileExtensions: ['web.js', 'js', 'web.ts', 'ts', 'json', 'node'],
  testMatch: ['<rootDir>/src/**/*.test.ts'],
  testEnvironment: 'node',
  rootDir: '.',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  transform: {
    ...tsjPreset.transform,
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|ts)$'],
  modulePaths: [],
  globals: {
    'ts-jest': {
      diagnostics: true,
      tsconfig: './tsconfig.jest.json',
    },
  },
};
