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

# About | [Documentation](https://github.com/soluble-io/cache-interop/)

Cache adapter for node [IoRedis](https://github.com/luin/ioredis) client.

## Install

```bash
$ yarn add @soluble/cache-ioredis
```

## Usage

```typescript
import { IoRedisCacheAdapter } from "@soluble/cache-ioredis";

const cache = new IoRedisCacheAdapter({
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

IORedisAdapter `connection` param can be a dsn as string, an IORedisConnection,
the native [IORedis.RedisOptions](https://github.com/luin/ioredis/blob/master/API.md#new-redisport-host-options) connection.

> You can use the `getIoRedisOptionsFromDsn` function to initiate a connection
> with native parameters.
>
> ```typescript
> import {
>   IoRedisCacheAdapter,
>   getIoRedisOptionsFromDsn,
> } from "@soluble/cache-ioredis";
>
> const dsn = "redis://localhost:6379/db2";
>
> const cache = new IoRedisCacheAdapter({
>   connection: getIoRedisOptionsFromDsn(dsn, {
>     // here all io-redis params.
>     connectTimeout: 1,
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
