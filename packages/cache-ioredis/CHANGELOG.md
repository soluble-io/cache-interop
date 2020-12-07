# @soluble/cache-ioredis

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

### Patch Changes

- Updated dependencies [[`47d2228`](https://github.com/soluble-io/cache-interop/commit/47d2228256a92a0e3bcacc205845f908e58f9f4e), [`ce0f736`](https://github.com/soluble-io/cache-interop/commit/ce0f73681cd3d5ecb98a1addd303852b71f1dad0), [`47d2228`](https://github.com/soluble-io/cache-interop/commit/47d2228256a92a0e3bcacc205845f908e58f9f4e), [`47d2228`](https://github.com/soluble-io/cache-interop/commit/47d2228256a92a0e3bcacc205845f908e58f9f4e), [`47d2228`](https://github.com/soluble-io/cache-interop/commit/47d2228256a92a0e3bcacc205845f908e58f9f4e), [`ce0f736`](https://github.com/soluble-io/cache-interop/commit/ce0f73681cd3d5ecb98a1addd303852b71f1dad0), [`a874e5f`](https://github.com/soluble-io/cache-interop/commit/a874e5f136f5437745d2495f03d4d2f30dceab7d), [`47d2228`](https://github.com/soluble-io/cache-interop/commit/47d2228256a92a0e3bcacc205845f908e58f9f4e)]:
  - @soluble/cache-interop@0.4.0

## 0.3.1

### Patch Changes

- [`5ad87be`](https://github.com/soluble-io/cache-interop/commit/5ad87be6fb7e17f8e8f3503c41fddcd60a028ed9) [#25](https://github.com/soluble-io/cache-interop/pull/25) Thanks [@belgattitude](https://github.com/belgattitude)! - Add support to ttl expiration

- Updated dependencies [[`5ad87be`](https://github.com/soluble-io/cache-interop/commit/5ad87be6fb7e17f8e8f3503c41fddcd60a028ed9)]:
  - @soluble/cache-interop@0.3.1

## 0.3.0

### Minor Changes

- [`1366ad7`](https://github.com/soluble-io/cache-interop/commit/1366ad75ddc7f1e0d5235b8a1e0c5dc124a9bef2) [#22](https://github.com/soluble-io/cache-interop/pull/22) Thanks [@belgattitude](https://github.com/belgattitude)! - refactor CacheInterface.clear()

* [`1366ad7`](https://github.com/soluble-io/cache-interop/commit/1366ad75ddc7f1e0d5235b8a1e0c5dc124a9bef2) [#22](https://github.com/soluble-io/cache-interop/pull/22) Thanks [@belgattitude](https://github.com/belgattitude)! - Added defaultValue in CacheInterface.get(key, defaultValue)

### Patch Changes

- Updated dependencies [[`1366ad7`](https://github.com/soluble-io/cache-interop/commit/1366ad75ddc7f1e0d5235b8a1e0c5dc124a9bef2), [`1366ad7`](https://github.com/soluble-io/cache-interop/commit/1366ad75ddc7f1e0d5235b8a1e0c5dc124a9bef2)]:
  - @soluble/cache-interop@0.3.0

## 0.2.2

### Patch Changes

- [`fe1fcca`](https://github.com/soluble-io/cache-interop/commit/fe1fcca812ff3d8683cebe722e47bd81715d6fbf) [#19](https://github.com/soluble-io/cache-interop/pull/19) Thanks [@belgattitude](https://github.com/belgattitude)! - Refactor delete and deleteMultiple return to be boolean

- Updated dependencies [[`fe1fcca`](https://github.com/soluble-io/cache-interop/commit/fe1fcca812ff3d8683cebe722e47bd81715d6fbf)]:
  - @soluble/cache-interop@0.2.2

## 0.2.1

### Patch Changes

- [`b46e72b`](https://github.com/soluble-io/cache-interop/commit/b46e72b8de732148c37e6ca8bb7cee6b7891884b) [#17](https://github.com/soluble-io/cache-interop/pull/17) Thanks [@belgattitude](https://github.com/belgattitude)! - Refactor has() api, implement method and and e2e

* [`636273c`](https://github.com/soluble-io/cache-interop/commit/636273c82f5af1287a34b4d673fc3fc22fffc922) [#17](https://github.com/soluble-io/cache-interop/pull/17) Thanks [@belgattitude](https://github.com/belgattitude)! - refactor deleteMultiple, getMultiple, deleteMultiple and add default to AbstractCacheAdapter

* Updated dependencies [[`b46e72b`](https://github.com/soluble-io/cache-interop/commit/b46e72b8de732148c37e6ca8bb7cee6b7891884b), [`636273c`](https://github.com/soluble-io/cache-interop/commit/636273c82f5af1287a34b4d673fc3fc22fffc922)]:
  - @soluble/cache-interop@0.2.1

## 0.2.0

### Minor Changes

- [`44138be`](https://github.com/soluble-io/cache-interop/commit/44138be407f9b2b36f6224b2c7004747ece3bb3a) [#15](https://github.com/soluble-io/cache-interop/pull/15) Thanks [@belgattitude](https://github.com/belgattitude)! - refactor cache interface

### Patch Changes

- Updated dependencies [[`44138be`](https://github.com/soluble-io/cache-interop/commit/44138be407f9b2b36f6224b2c7004747ece3bb3a), [`fac0f8f`](https://github.com/soluble-io/cache-interop/commit/fac0f8f3f5bb182f6e598ee78382723a338b5121)]:
  - @soluble/cache-interop@0.2.0

## 0.1.0

### Minor Changes

- [`309cd06`](https://github.com/soluble-io/cache-interop/commit/309cd061ea161b30abf17143fd290d423c22a4ee) [#13](https://github.com/soluble-io/cache-interop/pull/13) Thanks [@belgattitude](https://github.com/belgattitude)! - Extract cache-ioredis and fix bundle

### Patch Changes

- Updated dependencies [[`61bf8f3`](https://github.com/soluble-io/cache-interop/commit/61bf8f3f6f5abd276f6e034b4a834c43d3ad5524), [`36a1caf`](https://github.com/soluble-io/cache-interop/commit/36a1cafcc4be5e7254c1bb40d33ecddb3b84df09), [`309cd06`](https://github.com/soluble-io/cache-interop/commit/309cd061ea161b30abf17143fd290d423c22a4ee), [`3fc6340`](https://github.com/soluble-io/cache-interop/commit/3fc6340fd8ced1e0b9981b5a8b3b362d032182e4), [`61558a1`](https://github.com/soluble-io/cache-interop/commit/61558a10d2333a7aa1113ce3119cb76d4b9f3ed4), [`9e62d4f`](https://github.com/soluble-io/cache-interop/commit/9e62d4fee4e677b666095d9f452f267687c55ab8)]:
  - @soluble/cache-interop@0.1.0
