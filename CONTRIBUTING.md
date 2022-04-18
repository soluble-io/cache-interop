# Contributing

Contributions are welcome.

## Workflow

- Fork this repository on github.
- Create a branch with a name that describes the work you're doing.
- Add a changeset to signify version changes: `yarn g:changeset`. 

## Quality

Pull-requests should include tests that demonstrate the functionality of the feature
or bug fix.

### Unit tests

Unit test files are co-located with the source code within a `__tests__` subdirectory.

You can run them with:

```bash
$ yarn test-unit       # the specific package (in current working directory)
$ yarn g:test-unit     # all packages at once
```

### E2E tests
 
E2E test files are located in [./packages/cache-e2e-tests/test](https://github.com/soluble-io/cache-interop/tree/main/packages/cache-e2e-tests)
directory. To run them locally you'll need docker to be installed, then type

```bash
$ yarn g:test-e2e
```

## Conventions

### Git message format

The [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) 
convention is recommended. Just prefix your commit message with one of the following:

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
- **style**: A change that affects the scss, less, css styles

For example:

```bash
$ git commit -m 'chore: jest updated'
$ git commit -m 'feat: lru cache'
$ git commit -m 'fix: key format'
```

