# Contributing

Contributions are welcome.

## Workflow

- Fork this repository from the [github project home](https://www.github.com/soluble-io/cache-interop).
- Create a branch, make changes and create a new pull-request.
- Include unit and/or e2e tests.
- Include or update documentation if applicable.
- Include a [changeset](https://github.com/atlassian/changesets) to declare a change in versions (`yarn g:changeset`).

## Scripts

| Name                         | Description                                                      |
|------------------------------|------------------------------------------------------------------|
| `yarn g:changeset`           | Add a changeset to declare version bumps.                        |
| `yarn g:typecheck`           | Run typechecks all packages.                                     |
| `yarn g:lint`                | Display linter issues in all packages.                           |
| `yarn g:lint --fix`          | Attempt to auto-fix all packages                                 |
| `yarn g:test`                | Run unit and e2e test.                                           |
| `yarn g:test-unit`           | Run only unit tests.                                             |
| `yarn g:test-e2e`            | Run only e2e tests (requires docker)                             |
| `yarn g:build`               | Build all packages                                               |
| `yarn g:clean`               | Clean all caches and builds.                                     |
| `yarn g:build-api-doc`       | Regenerate api documentation in ./doc/api/                       |
| `yarn g:size`                | Ensure under bundle size limits (run `g:build` first).           |
| `yarn g:check-dist`          | Ensure build dist files passes es2017 (run `g:build` first).     |
| `yarn deps:check --dep dev`  | Will display what packages can be upgraded                       |
| `yarn deps:update --dep dev` | Apply possible updates (run `yarn install && yarn dedupe` after) |
| `yarn check:install`         | Detect potential dependency issues in packages                   |
| `yarn dedupe`                | Built-in yarn deduplication of the lock file                     |

> **Tip** By convention script prefixed with `g:` can be run from anywhere in the project and will execute their
> counterpart in all packages. Alternatively you can `cd` into a specific package directory and run the script
> without the `g:`, ie: `cd packages/cache-interop && yarn test-unit`.

## About tests

### E2E tests

E2E tests requires docker to be installed and lives in [./packages/cache-e2e-tests](./packages/cache-e2e-tests/test/suites).

### Unit tests

Simple unit tests lives in their respective package. Convention is to collocate in a `__tests__/[name].test.ts` file.

## Git message format

This repo adheres to the [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) convention.

### Enabled prefixes

- **chore**: Changes that affect the build system or external dependencies
- **ci**: Changes to our CI configuration files and scripts
- **docs**: Documentation only changes
- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **lint**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **test**: Adding missing tests or correcting existing tests
- **translation**: Adding missing translations or correcting existing ones
- **revert**: When reverting a commit

