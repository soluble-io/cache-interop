[@soluble/cache-interop - v0.9.1](../README.md) / CacheItemInterface

# Interface: CacheItemInterface<T, KBase\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `KBase` | extends [`CacheKey`](../README.md#cachekey) = [`CacheKey`](../README.md#cachekey) |

## Implemented by

- [`CacheItem`](../classes/CacheItem.md)

## Table of contents

### Properties

- [data](CacheItemInterface.md#data)
- [error](CacheItemInterface.md#error)
- [isHit](CacheItemInterface.md#ishit)
- [isPersisted](CacheItemInterface.md#ispersisted)
- [isSuccess](CacheItemInterface.md#issuccess)
- [metadata](CacheItemInterface.md#metadata)

## Properties

### data

• `Readonly` **data**: ``null`` \| `T`

___

### error

• `Readonly` **error**: `undefined` \| [`CacheException`](../classes/CacheException.md)

___

### isHit

• `Readonly` **isHit**: `boolean`

___

### isPersisted

• `Readonly` **isPersisted**: ``null`` \| `boolean`

___

### isSuccess

• `Readonly` **isSuccess**: `boolean`

___

### metadata

• `Readonly` **metadata**: [`CacheItemMetadata`](../README.md#cacheitemmetadata)<`KBase`\>
