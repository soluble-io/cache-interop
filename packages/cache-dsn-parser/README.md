# @soluble/cache-dsn-parser

<p align="center">
  <a aria-label="Version" href="https://codecov.io/gh/soluble-io/cache-interop">
    <img alt="Codecov" src="https://img.shields.io/codecov/c/github/soluble-io/cache-interop?logo=codecov&style=for-the-badge&labelColor=000000" />
  </a>

  <a aria-label="Codecov" href="https://codecov.io/gh/soluble-io/cache-interop">
    <img alt="Codecov" src="https://img.shields.io/codecov/c/github/soluble-io/cache-interop?flagName=cacheDsnParser&logo=codecov&style=for-the-badge&labelColor=000000" />
  </a>
  <a aria-label="Codefactor grade" href="https://www.codefactor.io/repository/github/soluble-io/cache-interop">
    <img alt="Codefactor" src="https://img.shields.io/codefactor/grade/github/soluble-io/cache-interop?label=Codefactor&logo=codefactor&style=for-the-badge&labelColor=000000" />
  </a>
  <a aria-label="CodeClimate maintainability" href="https://codeclimate.com/github/soluble-io/cache-interop">
    <img alt="Maintainability" src="https://img.shields.io/codeclimate/maintainability/soluble-io/cache-interop?label=Maintainability&logo=code-climate&style=for-the-badge&labelColor=000000" />
  </a>
  <a aria-label="CodeClimate technical debt" href="https://codeclimate.com/github/soluble-io/cache-interop">
    <img alt="Techdebt" src="https://img.shields.io/codeclimate/tech-debt/soluble-io/cache-interop?label=TechDebt&logo=code-climate&style=for-the-badge&labelColor=000000" />
  </a>
  <a aria-label="Licence" href="https://github.com/soluble-io/cache-interop/blob/main/LICENSE">
    <img alt="Licence" src="https://img.shields.io/npm/l/@soluble/cache-ioredis?style=for-the-badge&labelColor=000000" />
  </a>
</p>

[![stable release](https://img.shields.io/npm/v/@soluble/cache-dsn-parser.svg)](https://npm.im/@soluble/cache-dsn-parser)
[![npm](https://img.shields.io/npm/dt/@soluble/cache-dsn-parser)](https://www.npmjs.com/package/@soluble/cache-dsn-parser)
[![gzip size](https://badgen.net/bundlephobia/minzip/@soluble/cache-dsn-parser)](https://bundlephobia.com/result?p=@soluble/cache-dsn-parser)

[![codefactor](https://www.codefactor.io/repository/github/soluble-io/cache-interop/badge)](https://www.codefactor.io/repository/github/soluble-io/cache-interop)
[![codecov](https://codecov.io/gh/soluble-io/cache-interop/branch/main/graph/badge.svg?flag=cacheDsnParser)](https://codecov.io/gh/soluble-io/cache-interop)
[![Maintainability](https://api.codeclimate.com/v1/badges/115e70b4ecf997e2185c/maintainability)](https://codeclimate.com/github/soluble-io/cache-interop/maintainability)
![Code Climate technical debt](https://img.shields.io/codeclimate/tech-debt/soluble-io/cache-interop)
[![license](https://img.shields.io/npm/l/@soluble/cache-dsn-parser)](https://github.com/soluble-io/cache-interop/blob/main/LICENSE)

A basic DSN parser that handles special characters like `/` in the password field (most libs won't).

## Install

```bash
$ yarn add @soluble/cache-dsn-parser
```

### Usage

```typescript
import { parseDsn } from '@soluble/cache-dsn-parser';
const parsed = parseDsn('redis://user:p@s/d@www.example.com:6379/0?ssl=true');

if (parsed.success) {
  assert.deepEqual(parsed.value, {
    driver: 'redis',
    pass: 'password',
    host: 'www.example.com',
    user: 'user',
    port: 6379,
    db: '0',
    params: {
      ssl: true,
    },
  });
} else {
  assert.deepEqual(parsed.error, 'Cannot parse provided DSN');
}
```

## Faq

### Why result is wrapped
