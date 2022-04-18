module.exports = {
  root: true,
  ignorePatterns: ['**/build', '**/.cache', '**/dist', '.cache'],
  extends: [
    'eslint-config-bases/typescript',
    // 'eslint-config-bases/sonar',
    // 'eslint-config-bases/regexp',
    // 'eslint-config-bases/jest',
    'eslint-config-bases/prettier',
  ],
  env: {
    es6: true,
    node: true,
  },
  rules: {},
  overrides: [],
};
