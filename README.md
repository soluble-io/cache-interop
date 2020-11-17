# Cache interop

[![codecov](https://codecov.io/gh/soluble-io/tci/branch/main/graph/badge.svg)](https://codecov.io/gh/soluble-io/tci)

Collection of cache adapters for nodejs.   

## Features

- [x] Simple but powerful [API](./packages/cache-interop/src/cache.interface.ts).
- [x] Easily substitute any adapter.
- [x] Work with `async`/`await`.
- [x] Written in typescript.
- [x] Fully tested with [e2e](./packages/cache-e2e-tests/test/all-adapters-base.test.ts) tests.

## Quick examples

```typescript
import { IoRedisCacheAdapter } from '@soluble/cache-ioredis';

const cache = new IoRedisCacheAdapter({...});

const { value, error } = await cache.getOrSet('key', async () => {
  return fetch('/api/user').then(resp => resp.json());
}, { ttl: 3600 });

if (value)
```

## Adapters

| package                 | target | description                      |
|-------------------------|--------|---------------------------------------|
| [@soluble/cache-interop](./packages/cache-interop) | `node`,`browser` | Interoperability interfaces & contracts  |
| [@soluble/cache-ioredis](./packages/cache-ioredis) | `node` | Adapter for node [ioredis](https://github.com/luin/ioredis) driver |

  
## Structure

This monorepo holds the various adapters, the contracts for interoperability and the e2e tests.

```
./packages
 ├── cache-interop 
 │   └── # @soluble/cache-interop: cache interoperability contracts #
 ├── cache-ioredis
 │   └── # @soluble/cache-ioredis: ioredis adapter implementation #
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

