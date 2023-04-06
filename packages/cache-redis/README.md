<div align="center">
  <h1 align="center"><a aria-label="soluble/cache-redis" href="https://github.com/soluble-io/cache-interop/tree/main/packages/cache-redis">@soluble/cache-redis</a></h1>
  <h4 align="center"><a aria-label="soluble/cache-interop" href="">@soluble/cache-interop</a> cache adapter for <a aria-label="node-redis" href="https://github.com/NodeRedis/node-redis">node-redis</a></h4>
</div>

<p align="center">
  <a aria-label="Version" href="https://npm.im/@soluble/cache-redis">
    <img alt="Codecov" src="https://img.shields.io/npm/v/@soluble/cache-redis.svg?style=for-the-badge&labelColor=000000" />
  </a>
  <a aria-label="Downloads" href="https://npm.im/@soluble/cache-redis">
    <img alt="Downloads" src="https://img.shields.io/npm/dy/@soluble/cache-redis?style=for-the-badge&labelColor=000000" />
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

Cache adapter for node [redis](https://github.com/NodeRedis/node-redis) client.

## Install

```bash
$ yarn add @soluble/cache-redis redis
$ yarn add @types/redis --dev
```

## Usage

```typescript
import { RedisCacheAdapter } from "@soluble/cache-redis";

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
> } from "@soluble/cache-redis";
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

## Sponsors ❤️

If you are enjoying some of my OSS guides or libs for your company, I'd really appreciate a [sponsorship](https://github.com/sponsors/belgattitude), a [coffee](https://ko-fi.com/belgattitude) or a dropped star. That gives me a tasty morning boost and help me to make some of my ideas come true 🙏

### Special thanks

<table>
  <tr>
    <td>
      <a href="https://www.jetbrains.com/?ref=belgattitude" target="_blank">
         <img width="65" src="https://asset.brandfetch.io/idarKiKkI-/id53SttZhi.jpeg" alt="Jetbrains logo" />
      </a>
    </td>
    <td>
      <a href="https://www.embie.be/?ref=belgattitude" target="_blank">
        <img width="65" src="https://avatars.githubusercontent.com/u/98402122?s=200&v=4" alt="Jetbrains logo" />    
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://www.jetbrains.com/?ref=belgattitude" target="_blank">JetBrains</a>
    </td>
    <td align="center">
      <a href="https://www.embie.be/?ref=belgattitude" target="_blank">Embie.be</a>
    </td>
   </tr>
</table>
