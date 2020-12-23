# Cache interop

> This project is in early architectural definition ;)

[![codecov](https://codecov.io/gh/soluble-io/cache-interop/branch/main/graph/badge.svg)](https://codecov.io/gh/soluble-io/cache-interop)
[![codefactor](https://www.codefactor.io/repository/github/soluble-io/cache-interop/badge)](https://www.codefactor.io/repository/github/soluble-io/cache-interop)
[![Maintainability](https://api.codeclimate.com/v1/badges/115e70b4ecf997e2185c/maintainability)](https://codeclimate.com/github/soluble-io/cache-interop/maintainability)
![Code Climate technical debt](https://img.shields.io/codeclimate/tech-debt/soluble-io/cache-interop)
[![license](https://img.shields.io/npm/l/@soluble/cache-ioredis)](https://github.com/soluble-io/cache-interop/blob/main/LICENSE)

Collection of cache adapters for nodejs.   

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

const cache = new IoRedisCacheAdapter({...});

const fetchApi = async () => myFetch('/api').then(r => JSON.stringify(r));

const { value, error } = await cache.getOrSet('key', fetchApi(), { ttl: 3600 });

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
 ├── cache-dsn-parser
 │   └── # @soluble/cache-dsn-parser: utility for parsing connection dsn #
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

