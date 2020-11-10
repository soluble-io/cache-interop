'use strict';

module.exports = {
  name: 'cache-ioredis/unit',
  displayName: 'cache-ioredis/unit',
  verbose: true,
  collectCoverageFrom: ['src/**/*.{js,ts}', '!src/**/*.d.ts', '!src/**/*.test.ts'],
  moduleFileExtensions: ['web.js', 'js', 'web.ts', 'ts', 'json', 'node'],
  testMatch: ['<rootDir>/src/**/*.test.ts'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.(js|ts)$': 'ts-jest',
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
