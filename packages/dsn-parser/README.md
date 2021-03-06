<p align="center">
  <a href="https://github.com/soluble-io/cache-interop/tree/main/packages/dsn-parser">
    <h1 align="center">@soluble/dsn-parser</h1>
  </a>
</p>

<p align="center">
  <a aria-label="Version" href="https://npm.im/@soluble/dsn-parser">
    <img alt="Codecov" src="https://img.shields.io/npm/v/@soluble/dsn-parser.svg?style=for-the-badge&labelColor=000000" />
  </a>
  <a aria-label="Downloads" href="https://npm.im/@soluble/dsn-parser">
    <img alt="Downloads" src="https://img.shields.io/npm/dy/@soluble/dsn-parser?style=for-the-badge&labelColor=000000" />
  </a>
  <a aria-label="Size" href="https://bundlephobia.com/result?p=@soluble/dsn-parser">
    <img alt="Size" src="https://img.shields.io/bundlephobia/minzip/@soluble/dsn-parser?label=MinGZIP&style=for-the-badge&labelColor=000000" />
  </a>
  <a aria-label="Coverage" href="https://codecov.io/gh/soluble-io/cache-interop">
    <img alt="Codecov" src="https://img.shields.io/codecov/c/github/soluble-io/cache-interop?label=unit&logo=codecov&flag=dsn_parser_unit&style=for-the-badge&labelColor=000000" />
  </a>
  <a aria-label="Typings">
    <img alt="Typings" src="https://img.shields.io/static/v1?label=typings&message=3.7%2B&logo=typescript&style=for-the-badge&labelColor=000000&color=9cf" />
  </a>
  <a aria-label="Licence" href="https://github.com/soluble-io/cache-interop/blob/main/LICENSE">
    <img alt="Licence" src="https://img.shields.io/npm/l/@soluble/cache-ioredis?style=for-the-badge&labelColor=000000" />
  </a>
</p>

# About

A DSN parser with minimal validation that handles special characters like `/` in the password field (most libs won't).
Works in browser and node.

## Install

```bash
$ yarn add @soluble/dsn-parser
```

## Features

- [x] Portable, no assumption on driver (i.e: `redis`, `pgsql`...)
- [x] Support for optional query params.
- [x] Validation reasons rather than `try...catch`.
- [x] Provides `assertParsableDsn` assertion for convenience.

## Usage

```typescript
import { parseDsn } from '@soluble/dsn-parser';

const dsn = 'redis://user:p@/ss@localhost:6379/0?ssl=true''

const parsed = parseDsn(dsn);

if (parsed.success) {
  assert.deepEqual(parsed.value, {
    driver: 'redis',
    pass: 'p@/ss',
    host: 'localhost',
    user: 'user',
    port: 6379,
    db: '0',
    params: {
      ssl: true,
    },
  });
} else {
  assert.deepEqual(parsed, {
    success: false,
    // Reasons might vary
    reason: 'INVALID_PORT',
    message: 'Invalid http port: 12345678',
  });
}
```

## Options

```typescript
const dsn = 'mySql://localhost:6379/db';
const parsed = parseDsn(dsn, {
  lowercaseDriver: true,
  overrides: {
    db: 'db3',
    port: undefined,
  },
});

assert.deepEqual(parsed.value, {
  driver: 'mysql',
  host: 'localhost',
  db: 'db3',
});
```

| Params            | Type                   | Description                               |
| ----------------- | ---------------------- | ----------------------------------------- |
| `lowercaseDriver` | `<boolean>`            | Driver name in lowercase, default `false` |
| `overrides`       | `DSN must be a string` |                                           |

### Assertion

```typescript
import { assertParsableDsn, ParsableDsn } from '@soluble/dsn-parser';

try {
  assertParsableDsn('redis:/');
  // Type is narrowed to string (ParsableDsn) if it
  // didn't throw.
} catch (e) {
  assert.equal(e.message, 'Cannot parse DSN (PARSE_ERROR)');
}
```

## DSN parsing

### Requirements

The minimum requirement for dsn parsing is to have a **host** and
a **driver** _`(/[a-z0-9]+/i)`_ defined. All other options are optional.

```typescript
export type ParsedDsn = {
  driver: string;
  host: string;
  user?: string;
  pass?: string;
  port?: number;
  db?: string;
  /** Query params */
  params?: Record<string, number | string | boolean>;
};
```

### Query parameters

Simple query parameters are supported (no arrays, no nested). For convenience
it will cast `'true'` and `'false'` to **booleans**,
parse numeric string to **numbers** if possible. When a query
parameter does not contain a value, it will be returned as `true`.

```typescript
const dsn = 'redis://host?index=1&compress=false&ssl';
const parsed = parseDsn(dsn);
assert.deepEqual(parsed.value.params, {
  index: 1,
  compress: false,
  ssl: true,
});
```

### Portability

`parseDsn` won't make any assumptions on default values _(i.e: default port for mysql...)_.

### Validation

`parseDsn` wraps its result in a [discriminated union](https://basarat.gitbook.io/typescript/type-system/discriminated-unions)
to allow the retrieval of validation errors. No `try... catch`needed and full typescript support.

Reason codes are guaranteed in semantic versions and messages does not
leak credentials

```typescript
const parsed = parseDsn('redis://localhost:65636');
assert.deepEqual(parsed, {
  success: false,
  reason: 'INVALID_PORT',
  message: 'Invalid port: 65636',
});
if (!parsed.success) {
  // `success: false` narrows the type to
  // {
  //   reason: 'PARSE_ERROR'|'INVALID_ARGUMENT'|...
  //   message: string
  // }
  log(parsed.reason);
}
```

| Reason               | Message                 | Comment         |
| -------------------- | ----------------------- | --------------- |
| `'PARSE_ERROR'`      | `Cannot parse DSN`      | _Regexp failed_ |
| `'INVALID_ARGUMENT'` | `DSN must be a string`  |                 |
| `'EMPTY_DSN'`        | `DSN cannot be empty`   |                 |
| `'INVALID_PORT'`     | `Invalid port: ${port}` | [1-65535]       |

## Faq

### Why '/' in password matters

Some libs (ioredis...) still might fail parsing a password containing '/',
unfortunately they're pretty convenient, i.e:

```bash
openssl rand 60 | openssl base64 -A

# YFUXIG9INIK7dFyE9aXtxLmjmnYL0zv6YluBJJbC6alKIBema/MwEGy3VUpx0oLAvWHUFGFMagAdLxrB
```
