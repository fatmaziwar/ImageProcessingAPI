module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'prettier/prettier': 2,
    'no-use-before-define': ['error', { functions: true, classes: true }],
    'no-var': 'error',
    'prefer-const': 'error',
    '@typescript-eslint/no-empty-function': 'off'
  },

  globals: {
    process: true
  }
};
