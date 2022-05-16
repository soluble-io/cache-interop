[@soluble/cache-interop - v0.9.1](../README.md) / InvalidArgumentException

# Class: InvalidArgumentException

## Hierarchy

- [`CacheException`](CacheException.md)

  ↳ **`InvalidArgumentException`**

  ↳↳ [`InvalidCacheKeyException`](InvalidCacheKeyException.md)

## Table of contents

### Constructors

- [constructor](InvalidArgumentException.md#constructor)

### Properties

- [props](InvalidArgumentException.md#props)
- [stackTrace](InvalidArgumentException.md#stacktrace)

### Accessors

- [previous](InvalidArgumentException.md#previous)

### Methods

- [getName](InvalidArgumentException.md#getname)
- [toString](InvalidArgumentException.md#tostring)

## Constructors

### constructor

• **new InvalidArgumentException**(`props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `CacheExceptionProps` |

#### Overrides

[CacheException](CacheException.md).[constructor](CacheException.md#constructor)

## Properties

### props

• `Readonly` **props**: `CacheExceptionProps`

#### Inherited from

[CacheException](CacheException.md).[props](CacheException.md#props)

___

### stackTrace

• `Readonly` **stackTrace**: ``null`` \| `string`

#### Inherited from

[CacheException](CacheException.md).[stackTrace](CacheException.md#stacktrace)

## Accessors

### previous

• `get` **previous**(): ``null`` \| `Error`

#### Returns

``null`` \| `Error`

#### Inherited from

CacheException.previous

• `set` **previous**(`previous`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `previous` | ``null`` \| `Error` |

#### Returns

`void`

#### Inherited from

CacheException.previous

## Methods

### getName

▸ **getName**(): `string`

#### Returns

`string`

#### Inherited from

[CacheException](CacheException.md).[getName](CacheException.md#getname)

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Inherited from

[CacheException](CacheException.md).[toString](CacheException.md#tostring)
