const { join, } = require('path');
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  overrides: [
    {
      files: ['**/*.js',], // Áp dụng cấu hình cho tất cả các tệp .js
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    {
      files: ['**/*.jsx',], // Áp dụng cấu hình cho tất cả các tệp .jsx
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    'prettier',
  ],
  rules: {
    'jsx-quotes': [
      'error',
      'prefer-single',
    ],
    indent: [
      'error',
      2,
    ],
    quotes: [
      'error',
      'single',
    ],
    semi: [
      'error',
      'always',
    ],
    'spaced-comment': [
      'error',
      'always',
    ],
    'object-curly-newline': ['error', {
      ObjectExpression: 'always',
      ObjectPattern: {
        multiline: true,
      },
      ImportDeclaration: 'never',
      ExportDeclaration: {
        multiline: true, minProperties: 3,
      },
    },],
    'comma-dangle': [
      'error',
      {
        arrays: 'always',
        objects: 'always',
        imports: 'always',
        exports: 'always',
      },
    ],
    'block-spacing': [
      'error',
      'always',
    ],
    'object-curly-spacing': [
      'error',
      'always',
    ],
    'no-multi-spaces': 'error',
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        paths: [
          'src',
        ],
      },
      alias: {
        map: [
          ['~', join(__dirname, 'src'),],
        ],
        extensions: ['.js', '.jsx',],
      },
    },
  },
};
