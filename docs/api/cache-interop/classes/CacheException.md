[@soluble/cache-interop - v0.12.5](../README.md) / CacheException

# Class: CacheException

## Hierarchy

- `Error`

  ↳ **`CacheException`**

  ↳↳ [`InvalidArgumentException`](InvalidArgumentException.md)

  ↳↳ [`UnsupportedFeatureException`](UnsupportedFeatureException.md)

  ↳↳ [`CacheProviderException`](CacheProviderException.md)

  ↳↳ [`UnexpectedErrorException`](UnexpectedErrorException.md)

  ↳↳ [`UnsupportedValueException`](UnsupportedValueException.md)

## Table of contents

### Constructors

- [constructor](CacheException.md#constructor)

### Properties

- [props](CacheException.md#props)
- [stackTrace](CacheException.md#stacktrace)

### Accessors

- [previous](CacheException.md#previous)

### Methods

- [getName](CacheException.md#getname)
- [toString](CacheException.md#tostring)

## Constructors

### constructor

• **new CacheException**(`props`)

#### Parameters

| Name    | Type                  |
| :------ | :-------------------- |
| `props` | `CacheExceptionProps` |

#### Overrides

Error.constructor

## Properties

### props

• `Readonly` **props**: `CacheExceptionProps`

---

### stackTrace

• `Readonly` **stackTrace**: `null` \| `string`

## Accessors

### previous

• `get` **previous**(): `null` \| `Error`

#### Returns

`null` \| `Error`

• `set` **previous**(`previous`): `void`

#### Parameters

| Name       | Type              |
| :--------- | :---------------- |
| `previous` | `null` \| `Error` |

#### Returns

`void`

## Methods

### getName

▸ **getName**(): `string`

#### Returns

`string`

---

### toString

▸ **toString**(): `string`

#### Returns

`string`
