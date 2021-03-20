module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    es6: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      legacyDecorators: true,
      experimentalObjectRestSpread: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@emotion', 'react', 'react-hooks', '@typescript-eslint', 'prettier'],
  rules: {
    'react/prop-types': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    'react/display-name': 'off',
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    "@emotion/pkg-renaming": "error",
    "@emotion/jsx-import": "error",
    "@emotion/no-vanilla": "error",
    "@emotion/import-from-emotion": "error",
    "@emotion/styled-import": "error"
  },
};
