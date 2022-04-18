module.exports = {
  root: true,
  ignorePatterns: ['**/build', '**/.cache', '**/dist', '**/_release', '.cache'],
  extends: [
    'eslint-config-bases/typescript',
    'eslint-config-bases/sonar',
    // 'eslint-config-bases/regexp',
    'eslint-config-bases/jest',
    'eslint-config-bases/prettier',
  ],
  env: {
    es6: true,
    node: true,
  },
  rules: {
    'sonarjs/cognitive-complexity': ['error', 12],
  },
  overrides: [
    {
      files: ['packages/dsn-parser/src/**/*.ts'],
      rules: {
        'sonarjs/cognitive-complexity': ['error', 17],
      },
    },
  ],
};
