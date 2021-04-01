# @soluble/cache-e2e-tests

## 0.7.1

### Patch Changes

- [`6fdaa04`](https://github.com/soluble-io/cache-interop/commit/6fdaa04c012895da9aff374db5d1f7a3da78bdd5) [#82](https://github.com/soluble-io/cache-interop/pull/82) Thanks [@belgattitude](https://github.com/belgattitude)! - Typescript 4.2.2 support

## 0.7.0

### Minor Changes

- [`69279ff`](https://github.com/soluble-io/cache-interop/commit/69279ffe93b090828200e6e4394a3d5818c6a27f) [#79](https://github.com/soluble-io/cache-interop/pull/79) Thanks [@belgattitude](https://github.com/belgattitude)! - Uniform error messages

## 0.6.0

### Minor Changes

- [`77a2181`](https://github.com/soluble-io/cache-interop/commit/77a2181544160a130e292780a7936be7db4bea8e) [#77](https://github.com/soluble-io/cache-interop/pull/77) Thanks [@belgattitude](https://github.com/belgattitude)! - Added isSuccess, isHit in payload

* [`77a2181`](https://github.com/soluble-io/cache-interop/commit/77a2181544160a130e292780a7936be7db4bea8e) [#77](https://github.com/soluble-io/cache-interop/pull/77) Thanks [@belgattitude](https://github.com/belgattitude)! - Add onError option to has() method

- [`77a2181`](https://github.com/soluble-io/cache-interop/commit/77a2181544160a130e292780a7936be7db4bea8e) [#77](https://github.com/soluble-io/cache-interop/pull/77) Thanks [@belgattitude](https://github.com/belgattitude)! - CacheItem returns {data} rather than {value} (BC)

* [`77a2181`](https://github.com/soluble-io/cache-interop/commit/77a2181544160a130e292780a7936be7db4bea8e) [#77](https://github.com/soluble-io/cache-interop/pull/77) Thanks [@belgattitude](https://github.com/belgattitude)! - Export of Guards and Asserts

- [`77a2181`](https://github.com/soluble-io/cache-interop/commit/77a2181544160a130e292780a7936be7db4bea8e) [#77](https://github.com/soluble-io/cache-interop/pull/77) Thanks [@belgattitude](https://github.com/belgattitude)! - Add InvalidCacheKeyException checks

* [`5df5706`](https://github.com/soluble-io/cache-interop/commit/5df5706fa91cd390323450ea1aeec4aafff12224) [#77](https://github.com/soluble-io/cache-interop/pull/77) Thanks [@belgattitude](https://github.com/belgattitude)! - Fix typing exports

## 0.5.0

### Minor Changes

- [`83de083`](https://github.com/soluble-io/cache-interop/commit/83de083c47bc1650c5c0b48163992f5bafb7345f) [#72](https://github.com/soluble-io/cache-interop/pull/72) Thanks [@belgattitude](https://github.com/belgattitude)! - Introduce ConnectionInterface, remove getStorage (BC)

* [`5990f14`](https://github.com/soluble-io/cache-interop/commit/5990f148e3b8e2614c09a6ac0ff99c2c2ab67fd0) [#72](https://github.com/soluble-io/cache-interop/pull/72) Thanks [@belgattitude](https://github.com/belgattitude)! - Add close() method for ConnectionInterface

- [`83de083`](https://github.com/soluble-io/cache-interop/commit/83de083c47bc1650c5c0b48163992f5bafb7345f) [#72](https://github.com/soluble-io/cache-interop/pull/72) Thanks [@belgattitude](https://github.com/belgattitude)! - Adapter constructors accepts a dsn as string

* [`83de083`](https://github.com/soluble-io/cache-interop/commit/83de083c47bc1650c5c0b48163992f5bafb7345f) [#72](https://github.com/soluble-io/cache-interop/pull/72) Thanks [@belgattitude](https://github.com/belgattitude)! - Adapter constructor now requires options (BC)

## 0.4.0

### Minor Changes

- [`47d2228`](https://github.com/soluble-io/cache-interop/commit/47d2228256a92a0e3bcacc205845f908e58f9f4e) [#33](https://github.com/soluble-io/cache-interop/pull/33) Thanks [@belgattitude](https://github.com/belgattitude)! - Add disableCache option to CacheInterface.get() and CacheInterface.getMultiple()

* [`ce0f736`](https://github.com/soluble-io/cache-interop/commit/ce0f73681cd3d5ecb98a1addd303852b71f1dad0) [#33](https://github.com/soluble-io/cache-interop/pull/33) Thanks [@belgattitude](https://github.com/belgattitude)! - Support disableCache in adapter.has method

- [`47d2228`](https://github.com/soluble-io/cache-interop/commit/47d2228256a92a0e3bcacc205845f908e58f9f4e) [#33](https://github.com/soluble-io/cache-interop/pull/33) Thanks [@belgattitude](https://github.com/belgattitude)! - Minor refactor to CacheInterface.set, now returns a boolean (needed for disableCache)

* [`47d2228`](https://github.com/soluble-io/cache-interop/commit/47d2228256a92a0e3bcacc205845f908e58f9f4e) [#33](https://github.com/soluble-io/cache-interop/pull/33) Thanks [@belgattitude](https://github.com/belgattitude)! - Breaking refactor of CacheInterface.get(string, GetOptions), defaultValue is now set through GetOptions

- [`47d2228`](https://github.com/soluble-io/cache-interop/commit/47d2228256a92a0e3bcacc205845f908e58f9f4e) [#33](https://github.com/soluble-io/cache-interop/pull/33) Thanks [@belgattitude](https://github.com/belgattitude)! - Add disableCache option to CacheInterface.set() and CacheInterface.setMultiple()

* [`ce0f736`](https://github.com/soluble-io/cache-interop/commit/ce0f73681cd3d5ecb98a1addd303852b71f1dad0) [#33](https://github.com/soluble-io/cache-interop/pull/33) Thanks [@belgattitude](https://github.com/belgattitude)! - Add disableCache to Adapter.delete\* behaviour

- [`a874e5f`](https://github.com/soluble-io/cache-interop/commit/a874e5f136f5437745d2495f03d4d2f30dceab7d) [#33](https://github.com/soluble-io/cache-interop/pull/33) Thanks [@belgattitude](https://github.com/belgattitude)! - Add support for disableCache in CacheInterface.getOrSet()

* [`47d2228`](https://github.com/soluble-io/cache-interop/commit/47d2228256a92a0e3bcacc205845f908e58f9f4e) [#33](https://github.com/soluble-io/cache-interop/pull/33) Thanks [@belgattitude](https://github.com/belgattitude)! - Add disableCache option to Cacheinterface.getOrSet() with support for read/write

## 0.3.2

### Patch Changes

- [`bf3304b`](https://github.com/soluble-io/cache-interop/commit/bf3304bcacc2274d7e280ee982bb997c75efeffc) [#30](https://github.com/soluble-io/cache-interop/pull/30) Thanks [@belgattitude](https://github.com/belgattitude)! - Add expiry checks in MapCacheAdapter.has()

## 0.3.1

### Patch Changes

- [`5ad87be`](https://github.com/soluble-io/cache-interop/commit/5ad87be6fb7e17f8e8f3503c41fddcd60a028ed9) [#25](https://github.com/soluble-io/cache-interop/pull/25) Thanks [@belgattitude](https://github.com/belgattitude)! - Add support to ttl expiration

## 0.3.0

### Minor Changes

- [`1366ad7`](https://github.com/soluble-io/cache-interop/commit/1366ad75ddc7f1e0d5235b8a1e0c5dc124a9bef2) [#22](https://github.com/soluble-io/cache-interop/pull/22) Thanks [@belgattitude](https://github.com/belgattitude)! - Add tests for cache.clear

## 0.2.0

### Minor Changes

- [`fe1fcca`](https://github.com/soluble-io/cache-interop/commit/fe1fcca812ff3d8683cebe722e47bd81715d6fbf) [#19](https://github.com/soluble-io/cache-interop/pull/19) Thanks [@belgattitude](https://github.com/belgattitude)! - Update e2e test for new api for delete and deleteMultiple

## 0.1.2

### Patch Changes

- [`b46e72b`](https://github.com/soluble-io/cache-interop/commit/b46e72b8de732148c37e6ca8bb7cee6b7891884b) [#17](https://github.com/soluble-io/cache-interop/pull/17) Thanks [@belgattitude](https://github.com/belgattitude)! - Refactor has() api, implement method and and e2e

* [`636273c`](https://github.com/soluble-io/cache-interop/commit/636273c82f5af1287a34b4d673fc3fc22fffc922) [#17](https://github.com/soluble-io/cache-interop/pull/17) Thanks [@belgattitude](https://github.com/belgattitude)! - refactor deleteMultiple, getMultiple, deleteMultiple and add default to AbstractCacheAdapter

## 0.1.1

### Patch Changes

- [`6fcb178`](https://github.com/soluble-io/cache-interop/commit/6fcb1782f40c38002a442ff0a93e9c9cfd8be99a) [#15](https://github.com/soluble-io/cache-interop/pull/15) Thanks [@belgattitude](https://github.com/belgattitude)! - e2e: extend coverage

## 0.1.0

### Minor Changes

- [`309cd06`](https://github.com/soluble-io/cache-interop/commit/309cd061ea161b30abf17143fd290d423c22a4ee) [#13](https://github.com/soluble-io/cache-interop/pull/13) Thanks [@belgattitude](https://github.com/belgattitude)! - Extract cache-ioredis and fix bundle

### Patch Changes

- [`36a1caf`](https://github.com/soluble-io/cache-interop/commit/36a1cafcc4be5e7254c1bb40d33ecddb3b84df09) [#7](https://github.com/soluble-io/cache-interop/pull/7) Thanks [@belgattitude](https://github.com/belgattitude)! - Add e2e tests package

* [`e009a52`](https://github.com/soluble-io/cache-interop/commit/e009a5282e4edf44e914ab0b0ed1f0858506ec19) [#9](https://github.com/soluble-io/cache-interop/pull/9) Thanks [@belgattitude](https://github.com/belgattitude)! - added e2e for IoRedisCacheAdapter (with node-testcontainers)

## 0.0.7-canary.2

### Patch Changes

- [`e009a52`](https://github.com/soluble-io/cache-interop/commit/e009a5282e4edf44e914ab0b0ed1f0858506ec19) [#9](https://github.com/soluble-io/cache-interop/pull/9) Thanks [@belgattitude](https://github.com/belgattitude)! - added e2e for IoRedisCacheAdapter (with node-testcontainers)

## 0.0.7-canary.1

### Patch Changes

- [`36a1caf`](https://github.com/soluble-io/cache-interop/commit/36a1cafcc4be5e7254c1bb40d33ecddb3b84df09) [#7](https://github.com/soluble-io/cache-interop/pull/7) Thanks [@belgattitude](https://github.com/belgattitude)! - Add e2e tests package
