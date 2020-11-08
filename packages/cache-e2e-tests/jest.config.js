const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { defaults: tsjPreset } = require('ts-jest/presets');
const { compilerOptions } = require('./tsconfig');

console.log('cool', tsjPreset.transform);
console.log('cool', pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }));

/** @typedef {import('ts-jest')} */
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  name: 'e2e',
  displayName: 'e2e',
  verbose: true,
  /*
  transform: {
    ...tsjPreset.transform,
  },*/
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$'],
  rootDir: '../',
  testMatch: ['<rootDir>/cache-e2e-tests/**/*.test.ts', '**/*.test.ts'],
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  /*
  moduleNameMapper: {
    '../../cache-interop/src': '<rootDir>/cache-interop/src',
    '^@soluble/cache\\-interop$': '<rootDir>/cache-interop/src',
    '^@soluble/cache\\-interop/(.*)$': '<rootDir>/cache-interop/src/$1',
  },
  */
  collectCoverageFrom: ['<rootDir>/cache-interop/src/**/*.{ts,js}'],
  coverageDirectory: '<rootDir>/cache-e2e-tests/coverage',
  globals: {
    'ts-jest': {
      diagnostics: true,
      tsconfig: './tsconfig.json',
    },
  },
};
module.exports = config;
