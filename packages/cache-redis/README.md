# @soluble/cache-redis

[![stable release](https://img.shields.io/npm/v/@soluble/cache-redis.svg)](https://npm.im/@soluble/cache-redis)
[![codefactor](https://www.codefactor.io/repository/github/soluble-io/cache-interop/badge)](https://www.codefactor.io/repository/github/soluble-io/cache-interop)
[![codecov](https://codecov.io/gh/soluble-io/cache-interop/branch/main/graph/badge.svg)](https://codecov.io/gh/soluble-io/cache-interop)
[![Maintainability](https://api.codeclimate.com/v1/badges/115e70b4ecf997e2185c/maintainability)](https://codeclimate.com/github/soluble-io/cache-interop/maintainability)
![Code Climate technical debt](https://img.shields.io/codeclimate/tech-debt/soluble-io/cache-interop)
[![npm](https://img.shields.io/npm/dt/@soluble/cache-redis)](https://www.npmjs.com/package/@soluble/cache-redis)
[![gzip size](https://badgen.net/bundlephobia/minzip/@soluble/cache-redis)](https://bundlephobia.com/result?p=@soluble/cache-redis)
[![license](https://img.shields.io/npm/l/@soluble/cache-redis)](https://github.com/soluble-io/cache-interop/blob/main/LICENSE)

## Install

```bash
$ yarn add @soluble/cache-redis redis
$ yarn add @types/ioredis --dev
```

### Usage

```typescript
import { RedisCacheAdapter } from '@soluble/cache-redis';

const dsn = 'redis://user:pass@redis.com:6379/8';

const cache = new RedisCacheAdapter({ url: dsn });
```
