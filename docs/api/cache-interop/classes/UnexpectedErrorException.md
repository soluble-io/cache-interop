[@soluble/cache-interop - v0.12.5](../README.md) / UnexpectedErrorException

# Class: UnexpectedErrorException

## Hierarchy

- [`CacheException`](CacheException.md)

  ↳ **`UnexpectedErrorException`**

## Table of contents

### Constructors

- [constructor](UnexpectedErrorException.md#constructor)

### Properties

- [props](UnexpectedErrorException.md#props)
- [stackTrace](UnexpectedErrorException.md#stacktrace)

### Accessors

- [previous](UnexpectedErrorException.md#previous)

### Methods

- [getName](UnexpectedErrorException.md#getname)
- [toString](UnexpectedErrorException.md#tostring)

## Constructors

### constructor

• **new UnexpectedErrorException**(`props`)

#### Parameters

| Name    | Type                  |
| :------ | :-------------------- |
| `props` | `CacheExceptionProps` |

#### Overrides

[CacheException](CacheException.md).[constructor](CacheException.md#constructor)

## Properties

### props

• `Readonly` **props**: `CacheExceptionProps`

#### Inherited from

[CacheException](CacheException.md).[props](CacheException.md#props)

---

### stackTrace

• `Readonly` **stackTrace**: `null` \| `string`

#### Inherited from

[CacheException](CacheException.md).[stackTrace](CacheException.md#stacktrace)

## Accessors

### previous

• `get` **previous**(): `null` \| `Error`

#### Returns

`null` \| `Error`

#### Inherited from

CacheException.previous

• `set` **previous**(`previous`): `void`

#### Parameters

| Name       | Type              |
| :--------- | :---------------- |
| `previous` | `null` \| `Error` |

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

---

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Inherited from

[CacheException](CacheException.md).[toString](CacheException.md#tostring)
