[@soluble/cache-interop - v0.12.5](../README.md) / InvalidCacheKeyException

# Class: InvalidCacheKeyException

## Hierarchy

- [`InvalidArgumentException`](InvalidArgumentException.md)

  ↳ **`InvalidCacheKeyException`**

## Table of contents

### Constructors

- [constructor](InvalidCacheKeyException.md#constructor)

### Properties

- [props](InvalidCacheKeyException.md#props)
- [stackTrace](InvalidCacheKeyException.md#stacktrace)
- [defaultMessage](InvalidCacheKeyException.md#defaultmessage)

### Accessors

- [previous](InvalidCacheKeyException.md#previous)

### Methods

- [getName](InvalidCacheKeyException.md#getname)
- [getSafeKey](InvalidCacheKeyException.md#getsafekey)
- [toString](InvalidCacheKeyException.md#tostring)

## Constructors

### constructor

• **new InvalidCacheKeyException**(`props`)

#### Parameters

| Name    | Type    |
| :------ | :------ |
| `props` | `Props` |

#### Overrides

[InvalidArgumentException](InvalidArgumentException.md).[constructor](InvalidArgumentException.md#constructor)

## Properties

### props

• `Readonly` **props**: `CacheExceptionProps`

#### Inherited from

[InvalidArgumentException](InvalidArgumentException.md).[props](InvalidArgumentException.md#props)

---

### stackTrace

• `Readonly` **stackTrace**: `null` \| `string`

#### Inherited from

[InvalidArgumentException](InvalidArgumentException.md).[stackTrace](InvalidArgumentException.md#stacktrace)

---

### defaultMessage

▪ `Static` `Readonly` **defaultMessage**: `"InvalidArgument for cacheKey"`

## Accessors

### previous

• `get` **previous**(): `null` \| `Error`

#### Returns

`null` \| `Error`

#### Inherited from

InvalidArgumentException.previous

• `set` **previous**(`previous`): `void`

#### Parameters

| Name       | Type              |
| :--------- | :---------------- |
| `previous` | `null` \| `Error` |

#### Returns

`void`

#### Inherited from

InvalidArgumentException.previous

## Methods

### getName

▸ **getName**(): `string`

#### Returns

`string`

#### Inherited from

[InvalidArgumentException](InvalidArgumentException.md).[getName](InvalidArgumentException.md#getname)

---

### getSafeKey

▸ **getSafeKey**(): `string`

Return the received cacheKey in Json format to prevent
errors when displaying in error messages.

#### Returns

`string`

---

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Inherited from

[InvalidArgumentException](InvalidArgumentException.md).[toString](InvalidArgumentException.md#tostring)
