import { fixupConfigRules, fixupPluginRules } from '@eslint/compat'
import neostandard from 'neostandard'
import noOnlyTests from 'eslint-plugin-no-only-tests'
import svgJsx from 'eslint-plugin-svg-jsx'
import reactPlugin from 'eslint-plugin-react'
import importPlugin from 'eslint-plugin-import-x'
import globals from 'globals'

export default [
  // Wrap neostandard configs for ESLint 10 compat (eslint-plugin-react uses removed context APIs)
  ...fixupConfigRules(
    neostandard({
      noStyle: true,
    })
  ),

  // Main config with parser, plugins, and custom rules
  {
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        sinon: 'readonly',
        expect: 'readonly',
        chai: 'readonly',
      },
    },
    plugins: {
      'no-only-tests': noOnlyTests,
      'svg-jsx': svgJsx,
      react: fixupPluginRules(reactPlugin),
      import: importPlugin,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      // Import rules (using eslint-plugin-import-x under 'import' namespace)
      'import/no-unresolved': ['error', { commonjs: true, caseSensitive: true }],
      'import/no-named-default': 'off',
      'import/named': 'error',

      // React rules
      'react/prop-types': 'warn',
      'react/sort-comp': [
        'error',
        {
          order: [
            'static-methods',
            'instance-variables',
            'lifecycle',
            '/^handle.+$/',
            'getters',
            'setters',
            '/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/',
            'instance-methods',
            'everything-else',
            'rendering',
          ],
          groups: {
            lifecycle: [
              'displayName',
              'propTypes',
              'contextTypes',
              'childContextTypes',
              'mixins',
              'statics',
              'defaultProps',
              'constructor',
              'getDefaultProps',
              'getInitialState',
              'state',
              'getChildContext',
              'componentWillMount',
              'componentDidMount',
              'componentWillReceiveProps',
              'shouldComponentUpdate',
              'componentWillUpdate',
              'componentDidUpdate',
              'componentWillUnmount',
            ],
            rendering: ['/^render.+$/', 'render'],
          },
        },
      ],
      'react/jsx-handler-names': 'off',
      'react/no-deprecated': 'warn',

      // General
      'no-unused-expressions': 'off',
      'no-only-tests/no-only-tests': 'error',
      'array-callback-return': ['warn', { checkForEach: true }],
      'no-prototype-builtins': 'warn',
      'prefer-regex-literals': 'warn',

      // SVG JSX
      'svg-jsx/camel-case-dash': 'error',
      'svg-jsx/camel-case-colon': 'error',
      'svg-jsx/no-style-string': 'error',
    },
  },

  // Test file overrides
  {
    files: ['**/tests/**', '**/spec.js', '**/__mocks/**'],
    languageOptions: {
      globals: {
        ...globals.mocha,
        ...globals.jest,
        ...globals.jasmine,
      },
    },
  },
]
