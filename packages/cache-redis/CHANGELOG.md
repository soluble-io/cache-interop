# @soluble/cache-node-redis

## 0.4.2

### Patch Changes

- [`3b84baf`](https://github.com/soluble-io/cache-interop/commit/3b84baf1b2eddb1aa76da8c203cb073d2dc8ae29) [#60](https://github.com/soluble-io/cache-interop/pull/60) Thanks [@belgattitude](https://github.com/belgattitude)! - Compress dist files with terser

- Updated dependencies [[`3b84baf`](https://github.com/soluble-io/cache-interop/commit/3b84baf1b2eddb1aa76da8c203cb073d2dc8ae29)]:
  - @soluble/cache-interop@0.4.2

## 0.4.1

### Patch Changes

- [`55a5ea6`](https://github.com/soluble-io/cache-interop/commit/55a5ea6c5d09af404f25fb07d88fa0d50e2965dd) [#42](https://github.com/soluble-io/cache-interop/pull/42) Thanks [@belgattitude](https://github.com/belgattitude)! - Fixed invalid devDependencies for node-redis client

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

## 0.3.2

### Patch Changes

- [`0037249`](https://github.com/soluble-io/cache-interop/commit/0037249cf2256dc1cd1b0f17b813e08f577f7aa6) [#27](https://github.com/soluble-io/cache-interop/pull/27) Thanks [@belgattitude](https://github.com/belgattitude)! - node-redis adapter implementation
