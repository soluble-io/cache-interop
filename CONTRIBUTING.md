# Contributing

Contributions are welcome, just fork this repo and provide a pull request.

This repository follows some conventions:

- **Conventional commits**: in other words prefix your commit messages with
  one of the keys present in [commitlint.config.js](./commitlint.config.js). They
  can be useful for reviewers or release managers.
  
  >*If you're not familiar with conventional commits or struggling when trying to commit
  (a git hook enforces valid prefixes), 
  check out [this link](https://www.conventionalcommits.org/en/v1.0.0/).*
  
- **Code style**: To maintain consistency eslint/prettier will be applied on pre-commit for you
  through a git hook. Try to not disable hooks when committing, the CI will catch linter errors.

- **Test**: When applicable pull requests should include tests (unit/e2e). Refer to notes below about how to
  run them locally.

- **CI**: A github action will help you to locate most if not all possible failures or breaking 
  changes. Check successful runs in your github pull request.
  
- **Versions/Changelog**: To ease versioning and proper changelog generation this repo uses
  [atlassion/changesets](https://github.com/atlassian/changesets). Type `yarn changeset` at the
  project root, follow the instructions and include the generated changeset file. Changesets aren't
  necessary in all situation (i.e: dev dependencies update...)

## Running tests

Tests are separated in unit and e2e. You can run the whole suites by `yarn test` in the project root.
Tu run them separately:

### Unit tests

The convention for unit tests is to place them in their respective packages and 
colocate them in a `__tests__` subfolder. You can run
them by:


```bash
$ yarn test-unit       # the specific package (in current working directory)
$ yarn g:test-unit     # all packages at once
```


### E2E tests

E2E tests will run on all adapters and are found in [./packages/cache-e2e-tests/test](https://github.com/soluble-io/cache-interop/tree/main/packages/cache-e2e-tests), to run
them locally you'll need to install docker.

```bash
$ yarn test-e2e       # the specific package (in current working directory)
$ yarn g:test-e2e
```

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

