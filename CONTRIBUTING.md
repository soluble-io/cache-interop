# Contributing

Fork this repo and contribute a P/R.

## Structure

This monorepo holds the various adapters, the contracts for interoperability and the e2e tests.

```
./packages
 ├── cache-interop 
 │   └── # @soluble/cache-interop: cache interoperability contracts #
 ├── cache-ioredis
 │   └── # @soluble/cache-ioredis: ioredis adapter implementation #
 ├── cache-redis
 │   └── # @soluble/cache-redis: node redis adapter implementation #
 └── cache-e2e-tests
     └── # e2e test suite for all adapters #
```


