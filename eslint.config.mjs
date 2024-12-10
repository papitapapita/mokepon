import globals from 'globals';
import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    rules: {
      'no-unused-vars': 'error',
      'no-undef': 'error'
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest
      }
    }
  },
  pluginJs.configs.recommended
];
