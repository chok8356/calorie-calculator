/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    'plugin:import/recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier',
  ],
  plugins: ['import'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        printWidth: 100,
        semi: true,
        singleQuote: true,
        trailingComma: 'all',
        bracketSpacing: true,
        bracketSameLine: true,
        arrowParens: 'always',
        proseWrap: 'always',
        singleAttributePerLine: true,
      },
    ],
    '@typescript-eslint/no-explicit-any': 0,
    'import/no-unresolved': 0,
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'never',
      },
    ],
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/custom-event-name-casing': ['error', 'kebab-case'],
    'vue/html-comment-content-spacing': ['error', 'never'],
    'vue/next-tick-style': ['error', 'promise'],
    'vue/attributes-order': [
      'error',
      {
        alphabetical: true,
      },
    ],
    'vue/prefer-separate-static-class': ['error'],
    'vue/prefer-true-attribute-shorthand': ['error', 'always'],
    'vue/multi-word-component-names': 0,
  },
};
