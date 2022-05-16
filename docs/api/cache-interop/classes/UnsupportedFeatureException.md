[@soluble/cache-interop - v0.9.1](../README.md) / UnsupportedFeatureException

# Class: UnsupportedFeatureException

## Hierarchy

- [`CacheException`](CacheException.md)

  ↳ **`UnsupportedFeatureException`**

## Table of contents

### Constructors

- [constructor](UnsupportedFeatureException.md#constructor)

### Properties

- [props](UnsupportedFeatureException.md#props)
- [stackTrace](UnsupportedFeatureException.md#stacktrace)

### Accessors

- [previous](UnsupportedFeatureException.md#previous)

### Methods

- [getName](UnsupportedFeatureException.md#getname)
- [toString](UnsupportedFeatureException.md#tostring)

## Constructors

### constructor

• **new UnsupportedFeatureException**(`props`)

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
