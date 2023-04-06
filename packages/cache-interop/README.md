<div align="center">
  <h1 align="center"><a aria-label="soluble/cache-interop" href="https://github.com/soluble-io/cache-interop/tree/main/packages/cache-interop">@soluble/cache-interop</a></h1>
  <p align="center">Interoperability cache contracts and utilities.</p>
</div>
<p align="center">
  <a aria-label="Version" href="https://npm.im/@soluble/cache-interop">
    <img alt="Codecov" src="https://img.shields.io/npm/v/@soluble/cache-interop.svg?style=for-the-badge&labelColor=000000" />
  </a>
  <a aria-label="Downloads" href="https://npm.im/@soluble/cache-interop">
    <img alt="Downloads" src="https://img.shields.io/npm/dy/@soluble/cache-interop?style=for-the-badge&labelColor=000000" />
  </a>
  <a aria-label="Size" href="https://bundlephobia.com/result?p=@soluble/cache-interop">
    <img alt="Size" src="https://img.shields.io/bundlephobia/minzip/@soluble/cache-interop?label=MinGZIP&style=for-the-badge&labelColor=000000" />
  </a>
  <a aria-label="Coverage" href="https://codecov.io/gh/soluble-io/cache-interop">
    <img alt="Codecov" src="https://img.shields.io/codecov/c/github/soluble-io/cache-interop?label=Coverage&logo=codecov&style=for-the-badge&labelColor=000000" />
  </a>
  <a aria-label="Codefactor" href="https://www.codefactor.io/repository/github/soluble-io/cache-interop">
    <img alt="Codefactor" src="https://img.shields.io/codefactor/grade/github/soluble-io/cache-interop?label=CF&logo=codefactor&style=for-the-badge&labelColor=000000" />
  </a>
  <a aria-label="CodeClimate" href="https://codeclimate.com/github/soluble-io/cache-interop/maintainability">
    <img alt="CodeClimate" src="https://img.shields.io/codeclimate/maintainability/soluble-io/cache-interop?logo=code-climate&style=for-the-badge&labelColor=000000" />
  </a>
  <a aria-label="TechDebt" href="https://codeclimate.com/github/soluble-io/cache-interop/maintainability">
    <img alt="TechDebt" src="https://img.shields.io/codeclimate/tech-debt/soluble-io/cache-interop?label=TechDebt&logo=code-climate&style=for-the-badge&labelColor=000000" />
  </a>
  <a aria-label="Typings">
    <img alt="Typings" src="https://img.shields.io/static/v1?label=typings&message=3.5%2B&logo=typescript&style=for-the-badge&labelColor=000000&color=9cf" />
  </a>
  <a aria-label="Licence" href="https://github.com/soluble-io/cache-interop/blob/main/LICENSE">
    <img alt="Licence" src="https://img.shields.io/npm/l/@soluble/cache-interop?style=for-the-badge&labelColor=000000" />
  </a>
</p>

# About | [Documentation](https://https://github.com/soluble-io/cache-interop/)

Package holding cache-interop contracts.
You may want to look for official [adapter implementations](https://github.com/soluble-io/cache-interop/) instead.

## Install

```bash
$ yarn add @soluble/cache-interop
```

## Interfaces

### CacheInterface

```typescript
import {
  CacheInterface,
  ConnectedCacheInterface,
} from "@soluble/cache-interop";

class MyCache implements CacheInterface, ConnectedCacheInterface {
  //...
}
```

## Utilities

### Guards

> Typescript typeguards

```typescript
import { Guards } from "@soluble/cache-interop";

if (Guards.isConnectedCache(cache)) {
  await cache.getConnection().quit();
}

Guards.isValidCacheKey(key);

Guards.isCacheValueProviderFn(async () => {});

Guards.isNonEmptyString("Hi!");
```

### Asserts

> Typescript assertions

```typescript
import { Asserts } from "@soluble/cache-interop";

Asserts.assertValidCacheKey(key);
```

## Sponsors ❤️

If you are enjoying some of my OSS guides or libs for your company, I'd really appreciate a [sponsorship](https://github.com/sponsors/belgattitude), a [coffee](https://ko-fi.com/belgattitude) or a dropped star. That gives me a tasty morning boost and help me to make some of my ideas come true 🙏

### Special thanks

<table>
  <tr>
    <td>
      <a href="https://www.jetbrains.com/?ref=belgattitude" target="_blank">
         <img width="65" src="https://asset.brandfetch.io/idarKiKkI-/id53SttZhi.jpeg" alt="Jetbrains logo" />
      </a>
    </td>
    <td>
      <a href="https://www.embie.be/?ref=belgattitude" target="_blank">
        <img width="65" src="https://avatars.githubusercontent.com/u/98402122?s=200&v=4" alt="Jetbrains logo" />    
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://www.jetbrains.com/?ref=belgattitude" target="_blank">JetBrains</a>
    </td>
    <td align="center">
      <a href="https://www.embie.be/?ref=belgattitude" target="_blank">Embie.be</a>
    </td>
   </tr>
</table>
