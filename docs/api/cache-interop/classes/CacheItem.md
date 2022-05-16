[@soluble/cache-interop - v0.9.1](../README.md) / CacheItem

# Class: CacheItem<T, KBase\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `KBase` | extends [`CacheKey`](../README.md#cachekey) = [`CacheKey`](../README.md#cachekey) |

## Implements

- [`CacheItemInterface`](../interfaces/CacheItemInterface.md)<`T`, `KBase`\>

## Table of contents

### Constructors

- [constructor](CacheItem.md#constructor)

### Properties

- [data](CacheItem.md#data)
- [error](CacheItem.md#error)
- [isHit](CacheItem.md#ishit)
- [isPersisted](CacheItem.md#ispersisted)
- [isSuccess](CacheItem.md#issuccess)
- [metadata](CacheItem.md#metadata)

## Constructors

### constructor

• **new CacheItem**<`T`, `KBase`\>(`props`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `KBase` | extends `string` = `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `CacheItemProps`<`T`, `KBase`\> |

## Properties

### data

• `Readonly` **data**: ``null`` \| `T`

#### Implementation of

[CacheItemInterface](../interfaces/CacheItemInterface.md).[data](../interfaces/CacheItemInterface.md#data)

___

### error

• `Readonly` **error**: `undefined` \| [`CacheException`](CacheException.md)

#### Implementation of

[CacheItemInterface](../interfaces/CacheItemInterface.md).[error](../interfaces/CacheItemInterface.md#error)

___

### isHit

• `Readonly` **isHit**: `boolean`

#### Implementation of

[CacheItemInterface](../interfaces/CacheItemInterface.md).[isHit](../interfaces/CacheItemInterface.md#ishit)

___

### isPersisted

• `Readonly` **isPersisted**: ``null`` \| `boolean`

#### Implementation of

[CacheItemInterface](../interfaces/CacheItemInterface.md).[isPersisted](../interfaces/CacheItemInterface.md#ispersisted)

___

### isSuccess

• `Readonly` **isSuccess**: `boolean`

#### Implementation of

[CacheItemInterface](../interfaces/CacheItemInterface.md).[isSuccess](../interfaces/CacheItemInterface.md#issuccess)

___

### metadata

• `Readonly` **metadata**: [`CacheItemMetadata`](../README.md#cacheitemmetadata)<`KBase`\>

#### Implementation of

[CacheItemInterface](../interfaces/CacheItemInterface.md).[metadata](../interfaces/CacheItemInterface.md#metadata)
