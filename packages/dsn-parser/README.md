<p align="center">
  <a href="https://github.com/soluble-io/cache-interop">
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
  <a aria-label="Size" href="https://npm.im/@soluble/dsn-parser">
    <img alt="Size" src="https://img.shields.io/bundlephobia/minzip/@soluble/dsn-parser?label=MinGZIP&style=for-the-badge&labelColor=000000" />
  </a>
  <a aria-label="Coverage" href="https://codecov.io/gh/soluble-io/cache-interop">
    <img alt="Codecov" src="https://img.shields.io/codecov/c/github/soluble-io/cache-interop?label=unit&logo=codecov&flag=dsn_parser_unit&style=for-the-badge&labelColor=000000" />
  </a>
  <a aria-label="Licence" href="https://github.com/soluble-io/cache-interop/blob/main/LICENSE">
    <img alt="Licence" src="https://img.shields.io/npm/l/@soluble/cache-ioredis?style=for-the-badge&labelColor=000000" />
  </a>
</p>

A basic DSN parser that handles special characters like `/` in the password field (most libs won't).

## Install

```bash
$ yarn add @soluble/dsn-parser
```

### Usage

```typescript
import { parseDsn } from '@soluble/dsn-parser';
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
