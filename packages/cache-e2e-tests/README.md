<div align="center">
  <h1 align="center"><a aria-label="soluble/cache-e2e-tests" href="https://github.com/soluble-io/cache-interop/tree/main/packages/cache-e2e-tests">@soluble/cache-e2e-tests</a></h1>
  <h4 align="center"><a aria-label="soluble/cache-interop" href="https://github.com/soluble-io/cache-interop">@soluble/cache-interop</a> E2E shared test suites.</h4>
</div>
<p align="center">
  <a aria-label="Coverage" href="https://codecov.io/gh/soluble-io/cache-interop">
    <img alt="Codecov" src="https://img.shields.io/codecov/c/github/soluble-io/cache-interop?label=Coverage&logo=codecov&style=for-the-badge&labelColor=000000" />
  </a>
  <img alt="Jest" src="https://img.shields.io/badge/Jest-26.+-brightgreen?logo=jest&style=for-the-badge&labelColor=000000" />
  <img alt="Typescript" src="https://img.shields.io/badge/Typescript-4.+-blue?logo=typescript&style=for-the-badge&labelColor=000000" />
</p>

## About

The e2e package provides a shared suite for all [@soluble/cache-interop](https://github.com/soluble-io/cache-interop)
official adapters.

> Note that `test:e2e` requires docker installed on your machine.
> If you don't want to to install docker, you can rely
> on the [github action](https://github.com/soluble-io/cache-interop/blob/main/.github/workflows/ci.yml).

## Install

```bash
$ yarn install
```

## Run tests

```bash
$ yarn test:e2e
```

## Environments

The `test:e2e` uses [node-testcontainers](https://github.com/testcontainers/testcontainers-node) under the hood to
spin redis 5 and redis 6 instances.

## Contribute

See the [@soluble/cache-interop CONTRIBUTING.md](https://github.com/soluble-io/cache-interop/blob/main/CONTRIBUTING.md) guide.

## Acknowledgement

- [node-testcontainers](https://github.com/testcontainers/testcontainers-node) - Ephemeral docker instances to facilitate e2e on various services (redis...)
