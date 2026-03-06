# eslint-config-nicenice

ESLint flat config based on [neostandard](https://github.com/neostandard/neostandard) with some extra rules for React, imports, and SVG JSX.

**v5 requires ESLint 10+ and flat config.** Prettier is expected to be run separately for formatting.

## Install

```sh
npm install --save-dev eslint-config-nicenice eslint neostandard eslint-plugin-import-x eslint-plugin-no-only-tests eslint-plugin-svg-jsx globals prettier
```

## Usage

Create an `eslint.config.js` file:

```js
export { default } from 'eslint-config-nicenice'
```

Or if you want to extend or override:

```js
import nicenice from 'eslint-config-nicenice'

export default [
  ...nicenice,
  {
    rules: {
      // your overrides
    },
  },
]
```

Run ESLint:

```sh
npx eslint .
```

Run Prettier separately for formatting:

```sh
npx prettier --check .
```

## What's included

- [neostandard](https://github.com/neostandard/neostandard) base rules (with `noStyle: true` — no formatting rules)
- `eslint-plugin-import-x` for import validation
- `eslint-plugin-no-only-tests` to catch leftover `.only` in tests
- `eslint-plugin-svg-jsx` for SVG-in-JSX rules
- React rules including `react/sort-comp` lifecycle ordering
- Test file overrides with mocha/jest/jasmine globals

![so_good](https://user-images.githubusercontent.com/69169/38057017-f6b53d9e-3292-11e8-954e-8900809d442c.png)
