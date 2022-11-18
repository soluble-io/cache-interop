# Nextjs-app

> Version importing ESM modules

## Development

> Will use tsconfig path aliases, changes in @soluble/cache packages
> are immediately reflected

```
yarn dev
```

## Build

> Won't use tsconfig path aliases and thus requires a build of @solube/cache packages.

```
yarn g:build-packages
yarn build
yarn start
```
