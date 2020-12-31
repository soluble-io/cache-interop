# Contributing

Fork this repo and contribute a P/R.

## Running tests

Tests are separated in unit and e2e, you can launch them separately:

### Unit tests

The convention for unit tests is to place them in their respective packages and 
colocate them in a `__test__` subfolder. You can run
them by:

```bash
$ yarn test:unit
```

### E2E tests

E2E tests are packaged separately in [./packages/cache-e2e-tests/test](https://github.com/soluble-io/cache-interop/tree/main/packages/cache-e2e-tests) 
to allow coverage of all adapters.

> Note that `test:e2e` requires docker installed on your machine. 
> If you don't want to to install docker, you can rely
> on the [github action](https://github.com/soluble-io/cache-interop/blob/main/.github/workflows/ci.yml). 

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

