import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import react from 'eslint-plugin-react'
import typescript from 'eslint-plugin-import'
import tseslint from 'typescript-eslint'
import parser from '@typescript-eslint/parser'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2021,
      globals: globals.browser,
      parser: parser
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'react': react,
      'typescript': typescript,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/boolean-prop-naming': ['error'],
      // 'react/button-has-type': ['error'],
      'react/default-props-match-prop-types': ['error'],
      'react/display-name': 'off',
      'react/no-access-state-in-setstate': ['error'],
      'react/no-children-prop': ['error'],
      'react/no-danger-with-children': ['error'],
      'react/no-deprecated': ['error'],
      'react/no-direct-mutation-state': ['error'],
      'react/no-is-mounted': ['error'],
      'react/no-multi-comp': 'off',
      'react/no-find-dom-node': ['error'],
      'react/no-redundant-should-component-update': ['error'],
      'react/no-render-return-value': ['error'],
      'react/no-typos': ['error'],
      'react/no-string-refs': ['error'],
      'react/no-this-in-sfc': ['error'],
      'react/no-unknown-property': ['error'],
      'react/no-unsafe': ['error'],
      'react/no-unused-state': ['error'],
      'react/no-will-update-set-state': ['error', 'disallow-in-func'],
      'react/prefer-es6-class': ['error', 'always'],
      'react/prop-types': ['error'],
      // 'react/react-in-jsx-scope': ['error'],
      'react/require-render-return': ['error'],
      'react/self-closing-comp': ['error', { component: true, html: true }],
      'react/sort-comp': [
        'error',
        {
          order: [
            'type-annotations',
            'static-variables',
            'static-methods',
            'instance-variables',
            'lifecycle',
            '/^on.+$/',
            '/^handle.+$/',
            'everything-else',
            '/^render.+$/',
            'render'
          ]
        }
      ],
      'react/style-prop-object': ['error'],
      'react/void-dom-elements-no-children': ['error'],
      'react/jsx-boolean-value': ['error', 'never'],
      'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
      'react/jsx-closing-tag-location': ['error'],
      'react/jsx-curly-spacing': ['error', { when: 'never' }],
      'react/jsx-equals-spacing': ['error', 'never'],
      'react/jsx-first-prop-new-line': ['error', 'multiline'],
      'react/jsx-key': ['error'],
      'react/jsx-no-bind': ['error', { 'ignoreDOMComponents': true }],
      'react/jsx-no-duplicate-props': ['error'],
      'react/jsx-pascal-case': ['error', { allowAllCaps: true }],
      'react/jsx-uses-react': ['error'],
      'react/jsx-uses-vars': ['error'],
      'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
      'react/jsx-tag-spacing': [
        'error',
        {
          closingSlash: 'never',
          beforeSelfClosing: 'always',
          afterOpening: 'never',
          beforeClosing: 'never'
        }
      ],
      'react/jsx-wrap-multilines': [
        'error',
        {
          declaration: 'parens-new-line',
          assignment: 'parens-new-line',
          return: 'parens-new-line',
          arrow: 'parens-new-line',
          condition: 'parens-new-line',
          logical: 'parens-new-line',
          prop: 'parens-new-line'
        }
      ],
      '@typescript-eslint/ban-ts-comment': ['off'],
      '@typescript-eslint/no-explicit-any': ['off'],

      /* React Hooks */
      'react-hooks/rules-of-hooks': ['error'],
      'react-hooks/exhaustive-deps': ['error']
    },
  },
)

