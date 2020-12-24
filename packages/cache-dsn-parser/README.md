# @soluble/cache-dsn-parser

[![stable release](https://img.shields.io/npm/v/@soluble/cache-dsn-parser.svg)](https://npm.im/@soluble/cache-dsn-parser)
[![codefactor](https://www.codefactor.io/repository/github/soluble-io/cache-interop/badge)](https://www.codefactor.io/repository/github/soluble-io/cache-interop)
[![codecov](https://codecov.io/gh/soluble-io/cache-interop/branch/main/graph/badge.svg?flag=cacheDsnParser)](https://codecov.io/gh/soluble-io/cache-interop)
[![Maintainability](https://api.codeclimate.com/v1/badges/115e70b4ecf997e2185c/maintainability)](https://codeclimate.com/github/soluble-io/cache-interop/maintainability)
![Code Climate technical debt](https://img.shields.io/codeclimate/tech-debt/soluble-io/cache-interop)
[![npm](https://img.shields.io/npm/dt/@soluble/cache-dsn-parser)](https://www.npmjs.com/package/@soluble/cache-dsn-parser)
[![gzip size](https://badgen.net/bundlephobia/minzip/@soluble/cache-dsn-parser)](https://bundlephobia.com/result?p=@soluble/cache-dsn-parser)
[![license](https://img.shields.io/npm/l/@soluble/cache-dsn-parser)](https://github.com/soluble-io/cache-interop/blob/main/LICENSE)

## Install

```bash
$ yarn add @soluble/cache-dsn-parser
```

### Usage

```typescript
import { parseDsn } from '@soluble/cache-dsn-parser';
const parsed = parseDsn('redis://user:p@s/d@www.example.com:6379/0');

// Will give somthing like
toStrictEqual(
  {
    driver: 'redis',
    pass: 'password',
    host: 'www.example.com',
    user: 'user',
    port: 6379,
    db: '0',
  },
  parsed
);
```
