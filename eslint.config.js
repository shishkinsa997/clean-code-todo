import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import js from '@eslint/js';
import globals from 'globals';

export default defineConfig([
  js.configs.recommended,
  {
    files: ['**/*.js'],
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
      'no-var': 'error',
      'prefer-const': 'error',
      'no-console': 'warn',
    },
    languageOptions: { globals: globals.browser },
  },
  eslintConfigPrettier,
]);
