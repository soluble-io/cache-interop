<div align="center">
  <h1 align="center"><a aria-label="soluble/cache-interop" href="https://github.com/soluble-io/cache-interop">cache-interop</a></h1>
  <p align="center">Interoperable cache adapters for node and browsers.</p>
</div>
<p align="center">
  <a aria-label="Build" href="https://github.com/soluble-io/cache-interop/actions?query=workflow%3ACI">
    <img alt="build" src="https://img.shields.io/github/workflow/status/soluble-io/cache-interop/CI/main?label=CI&logo=github&style=for-the-badge&labelColor=000000" />
  </a>
  <a aria-label="Codecov" href="https://codecov.io/gh/soluble-io/cache-interop">
    <img alt="Codecov" src="https://img.shields.io/codecov/c/github/soluble-io/cache-interop?logo=codecov&style=for-the-badge&labelColor=000000" />
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
  <a aria-label="Downloads" href="https://npm.im/@soluble/cache-interop">
    <img alt="Downloads" src="https://img.shields.io/npm/dt/@soluble/cache-interop?style=for-the-badge&labelColor=000000" />
  </a>
  <a aria-label="Ts LoC" href="https://github.com/soluble-io/cache-interop/search?l=typescript">  
    <img alt="TS LoC" src="https://img.shields.io/tokei/lines/github/soluble-io/cache-interop?logo=typescript&style=for-the-badge&labelColor=000000" />
  </a>
  <a aria-label="Licence" href="https://github.com/soluble-io/cache-interop/blob/main/LICENSE">
    <img alt="Licence" src="https://img.shields.io/npm/l/@soluble/cache-ioredis?style=for-the-badge&labelColor=000000" />
  </a>
</p>

> **This project is in early architectural definition ;)**


## Features

- [x] Simple but powerful [API](./packages/cache-interop/src/cache.interface.ts).
- [x] Work with `async`/`await`.
- [x] Don't throw errors.
- [x] Written in typescript.
- [x] Fully tested with [e2e](./packages/cache-e2e-tests/test/all-adapters-base.test.ts) tests.


## Roadmap

- [ ] Finalize v1 API
    - [ ] injectable LoggerInterface
    - [ ] SerializerInterface (json, msgpack, gzip, marshaller)
      - [ ] Chainable serializer (json -> gzip...)
    - [ ] Cache manager
      - [ ] Chainable cache adapter (allows lru as L1, redis as L2)
- [ ] Adapters
    - [ ] adapter for node-redis
    - [ ] lru-cache
- [ ] Documentation          

 

## Quick examples

### Adapter.getOrSet()

```typescript
import { IoRedisCacheAdapter } from '@soluble/cache-ioredis';

const cache = new IoRedisCacheAdapter({
  connection: 'redis://localhost:6375',
});

const asyncFetch = () => myFetch('/api').then(r => JSON.stringify(r));

const { value, error } = await cache.getOrSet('key', asyncFetch(), { ttl: 3600 });

if (value !== null) {
  // do something
}
```


| GetOrSetOptions | target | default | description            |
|-----------------|--------|---------|------------------------|
| `ttl`           | `number` | 0       | Time-To-Live in seconds since Epoch time. If zero, no expiry.|
| `disableCache`  | `boolean`/`{read: boolean, write: boolean}` | false      | |


### DisableCache



## Adapters

| package                 | target | description                      |
|-------------------------|--------|---------------------------------------|
| [@soluble/cache-interop](./packages/cache-interop) | `node`,`browser` | Interoperability interfaces & contracts  |
| [@soluble/cache-ioredis](./packages/cache-ioredis) | `node` | Adapter for node [ioredis](https://github.com/luin/ioredis) driver |
| [@soluble/cache-redis](./packages/cache-redis) | `node` | Adapter for node [redis](https://github.com/NodeRedis/node-redis) driver |

  
## Structure

This monorepo holds the various adapters, the contracts for interoperability and the e2e tests.

```
./packages
 ├── dsn-parser
 │   └── # @soluble/dsn-parser: utility for parsing connection dsn #
 ├── cache-interop 
 │   └── # @soluble/cache-interop: cache interoperability contracts #
 ├── cache-ioredis
 │   └── # @soluble/cache-ioredis: ioredis adapter implementation #
 ├── cache-redis
 │   └── # @soluble/cache-redis: node redis adapter implementation #
 └── cache-e2e-tests
     └── # e2e test suite for all adapters #
```

### Inspiration

- [PSR-6](https://www.php-fig.org/psr/psr-6/) - PHP Cache interface standard recommendation.
- [PSR-16](https://www.php-fig.org/psr/psr-6/) - PHP SimpleCache interface standard recommendation.
- [Symfony cache](https://github.com/symfony/cache) - Symfony cache component. 
- [Node-cache-manager](https://github.com/BryanDonovan/node-cache-manager) - Flexible NodeJS cache module.
- [C# getOrSet](https://csharp.hotexamples.com/examples/Microsoft.Framework.Caching.Memory/MemoryCache/GetOrSet/php-memorycache-getorset-method-examples.html) - C# Memory::getOrSet() method.
- [SWR](https://swr.vercel.app/) - React Hooks library for data fetching

### Acknowledgements

- [microbundle](https://github.com/developit/microbundle) - Zero-configuration bundler for tiny modules. 
- [node-testcontainers](https://github.com/testcontainers/testcontainers-node) - Ephemeral docker instances to facilitate e2e on various services (redis...)
- [atlassian/changesets](https://github.com/atlassian/changesets) - To ease pain with monorepo versioning.

