<div align="center">
  <h1 align="center"><a aria-label="soluble/cache-ioredis" href="https://github.com/soluble-io/cache-interop/tree/main/packages/cache-ioredis">@soluble/cache-ioredis</a></h1>
  <h4 align="center"><a aria-label="soluble/cache-interop" href="">@soluble/cache-interop</a> cache adapter for <a aria-label="node-redis" href="https://github.com/luin/ioredis">node ioredis</a> driver.</h4>
</div>

<p align="center">
  <a aria-label="Version" href="https://npm.im/@soluble/cache-ioredis">
    <img alt="Codecov" src="https://img.shields.io/npm/v/@soluble/cache-ioredis.svg?style=for-the-badge&labelColor=000000" />
  </a>
  <a aria-label="Downloads" href="https://npm.im/@soluble/cache-ioredis">
    <img alt="Downloads" src="https://img.shields.io/npm/dy/@soluble/cache-ioredis?style=for-the-badge&labelColor=000000" />
  </a>
  <a aria-label="Coverage" href="https://codecov.io/gh/soluble-io/cache-interop">
    <img alt="Codecov" src="https://img.shields.io/codecov/c/github/soluble-io/cache-interop?label=Coverage&logo=codecov&style=for-the-badge&labelColor=000000" />
  </a>
  <a aria-label="Codefactor" href="https://www.codefactor.io/repository/github/soluble-io/cache-interop">
    <img alt="Codefactor" src="https://img.shields.io/codefactor/grade/github/soluble-io/cache-interop?label=CF&logo=codefactor&style=for-the-badge&labelColor=000000" />
  </a>
  <a aria-label="CodeClimate" href="https://codeclimate.com/github/soluble-io/cache-interop/maintainability">
    <img alt="CodeClimate" src="https://img.shields.io/codeclimate/maintainability/soluble-io/cache-interop?logo=code-climate&style=for-the-badge&labelColor=000000" />
  </a>
  <a aria-label="TechDebt" href="https://codeclimate.com/github/soluble-io/cache-interop/maintainability">
    <img alt="TechDebt" src="https://img.shields.io/codeclimate/tech-debt/soluble-io/cache-interop?label=TechDebt&logo=code-climate&style=for-the-badge&labelColor=000000" />
  </a>
  <a aria-label="Typings">
    <img alt="Typings" src="https://img.shields.io/static/v1?label=typings&message=3.5%2B&logo=typescript&style=for-the-badge&labelColor=000000&color=9cf" />
  </a>
  <a aria-label="Licence" href="https://github.com/soluble-io/cache-interop/blob/main/LICENSE">
    <img alt="Licence" src="https://img.shields.io/npm/l/@soluble/cache-ioredis?style=for-the-badge&labelColor=000000" />
  </a>
</p>

## Install

```bash
$ yarn add @soluble/cache-ioredis ioredis
$ yarn add @types/ioredis --dev
```

### Usage

```typescript
import { IoRedisCacheAdapter } from '@soluble/cache-ioredis';

const dsn = 'redis://user:pass@redis.com:6379/8';

const cache = IoRedisCacheAdapter.createFromDSN(dsn);
```
