<div align="center">
  <h1 align="center"><a aria-label="soluble/cache-redis-client" href="https://github.com/soluble-io/cache-interop/tree/main/packages/cache-redis-client">@soluble/cache-redis-client</a></h1>
  <h4 align="center"><a aria-label="soluble/cache-interop" href="">@soluble/cache-interop</a> cache adapter for <a aria-label="node-redis" href="https://github.com/NodeRedis/node-redis">node-redis</a></h4>
</div>

<p align="center">
  <a aria-label="Version" href="https://npm.im/@soluble/cache-redis-client">
    <img alt="Codecov" src="https://img.shields.io/npm/v/@soluble/cache-redis-client.svg?style=for-the-badge&labelColor=000000" />
  </a>
  <a aria-label="Downloads" href="https://npm.im/@soluble/cache-redis">
    <img alt="Downloads" src="https://img.shields.io/npm/dy/@soluble/cache-redis-client?style=for-the-badge&labelColor=000000" />
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

# About | [Documentation](https://github.com/soluble-io/cache-interop/)

Cache adapter for [@redis/client](https://github.com/NodeRedis/node-redis) client.

## Install

```bash
$ yarn add @soluble/cache-redis-client
```

## Usage

```typescript
import { RedisCacheAdapter } from "@soluble/cache-redis-client";

const cache = new RedisCacheAdapter({
  connection: "redis://:pass@localhost:6379/8",
});

const { data, error } = await cache.getOrSet("key", asyncPromise, {
  ttl: 30,
});

if (await cache.has("key")) {
  await cache.delete("key");
}
```

## Constructor

### Connection

RedisAdapter `connection` param can be a DSN, a RedisConnection,
the native [ClientOpts](https://github.com/NodeRedis/node-redis#options-object-properties) or an existing [RedisClient](https://github.com/NodeRedis/node-redis) connection.

> You can use the `getRedisOptionsFromDsn` function to initiate a connection
> with native parameters.
>
> ```typescript
> import {
>   RedisCacheAdapter,
>   getRedisOptionsFromDsn,
> } from "@soluble/cache-redis-client";
>
> const dsn = "redis://localhost:6379/db2";
>
> const cache = new RedisCacheAdapter({
>   connection: getRedisOptionsFromDsn(dsn, {
>     // here all node-redis client options
>     enable_offline_queue: false,
>   }),
> });
> ```