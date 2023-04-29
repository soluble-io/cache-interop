[@soluble/cache-interop - v0.12.5](../README.md) / UnsupportedValueException

# Class: UnsupportedValueException

## Hierarchy

- [`CacheException`](CacheException.md)

  ↳ **`UnsupportedValueException`**

## Table of contents

### Constructors

- [constructor](UnsupportedValueException.md#constructor)

### Properties

- [props](UnsupportedValueException.md#props)
- [stackTrace](UnsupportedValueException.md#stacktrace)

### Accessors

- [previous](UnsupportedValueException.md#previous)

### Methods

- [getName](UnsupportedValueException.md#getname)
- [toString](UnsupportedValueException.md#tostring)

## Constructors

### constructor

• **new UnsupportedValueException**(`props`)

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
