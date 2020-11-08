'use strict';

module.exports = {
  name: 'unit',
  displayName: 'unit',
  verbose: true,
  collectCoverageFrom: ['src/**/*.{js,ts}', '!src/**/*.d.ts', , '!src/**/*.test.ts'],
  moduleFileExtensions: ['web.js', 'js', 'web.ts', 'ts', 'json', 'node'],
  //roots: ['<rootDir>/../../', '<rootDir>/../../'],
  testMatch: ['<rootDir>/test/**/*.{spec,test}.{ts,js}', '<rootDir>/src/**/*.{spec,test}.{ts,js}'],
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
