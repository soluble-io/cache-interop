// @ts-check
import { pathsToModuleNameMapper } from 'ts-jest';
import { getTsconfig } from 'get-tsconfig';
import { getJestCachePath } from '../../cache.config.js';

const tsConfigFile = new URL('./tsconfig.jest.json', import.meta.url).pathname;

/**
 * Transform the tsconfig paths into jest compatible one (support extends)
 * @param {string} tsConfigFile
 */
const getTsConfigBasePaths = (tsConfigFile) => {
  const parsedTsConfig = getTsconfig(tsConfigFile);
  if (parsedTsConfig === null) {
    throw new Error(`Cannot find tsconfig file: ${tsConfigFile}`);
  }
  const tsPaths = parsedTsConfig.config.compilerOptions?.paths;
  return tsPaths
    ? pathsToModuleNameMapper(tsPaths, {
        prefix: '<rootDir>/',
      })
    : {};
};

/** @type {import('ts-jest/dist').InitialOptionsTsJest} */
const config = {
  displayName: `cache-interop:unit`,
  preset: 'ts-jest/presets/default-esm',
  cacheDirectory: getJestCachePath('@soluble/cache-interop'),
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  verbose: true,
  rootDir: './src',
  testMatch: ['<rootDir>/**/*.{spec,test}.{js,jsx,ts,tsx}'],
  moduleNameMapper: {
    ...getTsConfigBasePaths(tsConfigFile),
  },
  // false by default, overrides in cli, ie: yarn test:unit --collect-coverage=true
  collectCoverage: false,
  coverageDirectory: '<rootDir>/../coverage',
  collectCoverageFrom: [
    '<rootDir>/**/*.{ts,tsx,js,jsx}',
    '!**/*.test.{js,ts}',
    '!**/__mock__/*',
  ],
  globals: {
    'ts-jest': {
      useESM: true,
      tsconfig: tsConfigFile,
    },
  },
};

export default config;
