'use strict';

module.exports = {
  name: 'unit',
  displayName: 'unit',
  verbose: true,
  collectCoverageFrom: ['src/**/*.{js,ts}', '!src/**/*.d.ts'],
  moduleFileExtensions: ['web.js', 'js', 'web.ts', 'ts', 'json', 'node'],
  //roots: ['<rootDir>/../../', '<rootDir>/../../'],
  testMatch: ['<rootDir>/test/**/*.{spec,test}.{ts,js}', '<rootDir>/src/**/*.{spec,test}.{ts,js}'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|ts)$': 'ts-jest',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$', '^.+\\.module\\.(css|sass|scss|less)$'],
  modulePaths: [],

  globals: {
    window: {},
    'ts-jest': {
      diagnostics: true,
      tsconfig: './tsconfig.jest.json',
    },
  },
};
