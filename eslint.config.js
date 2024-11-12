import pluginJs from '@eslint/js'
import js from '@eslint/js'
import prettierConfig from 'eslint-config-prettier'
import eslintPluginImport from 'eslint-plugin-import'
import jest from 'eslint-plugin-jest'
import prettier from 'eslint-plugin-prettier'
import pluginReact from 'eslint-plugin-react'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'

export default [
  js.configs.recommended,
  {
    files: ['**/__tests__/**', '**/*.{test,spec}.{js,jsx}'],
    plugins: {
      jest, // Use the jest plugin
    },
    ...jest.configs['flat/recommended'],
    rules: {
      ...jest.configs['flat/recommended'].rules,
      'jest/prefer-expect-assertions': 'off',
    },
  },
  {
    ignores: ['**/build', '**/dist', '**/node_modules', 'eslint.config.js'],
  },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: {
      'react': {
        version: '18.3',
      },
      'import/resolver': {
        alias: {
          map: [
            ['@components', './src/components'],
            ['@views', './src/views'],
            ['@assets', './src/assets'],
            ['@state', './src/state'],
            ['@hooks', './src/hooks'],
            ['@config', './src/hooks'],
            ['@services', './src/services'],
          ],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier,
      'import': eslintPluginImport,
    },
    rules: {
      'prefer-arrow-callback': ['error'],
      'func-style': ['error', 'expression', { allowArrowFunctions: true }],
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': 'off',
      'react/jsx-no-target-blank': 'off',
      'react/prop-types': 'off', // Disable prop-types rule
      'prettier/prettier': ['error'],
      ...prettierConfig.rules,
      'import/order': [
        'error',
        {
          'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          'alphabetize': {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
]
