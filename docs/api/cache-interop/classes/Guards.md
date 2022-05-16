[@soluble/cache-interop - v0.9.1](../README.md) / Guards

# Class: Guards

## Table of contents

### Constructors

- [constructor](Guards.md#constructor)

### Methods

- [isCacheException](Guards.md#iscacheexception)
- [isCacheValueProviderFn](Guards.md#iscachevalueproviderfn)
- [isConnectedCache](Guards.md#isconnectedcache)
- [isNonEmptyString](Guards.md#isnonemptystring)
- [isValidCacheKey](Guards.md#isvalidcachekey)
- [isValidRedisValue](Guards.md#isvalidredisvalue)

## Constructors

### constructor

• **new Guards**()

## Methods

### isCacheException

▸ `Static` **isCacheException**(`val`): val is CacheException

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `unknown` |

#### Returns

val is CacheException

___

### isCacheValueProviderFn

▸ `Static` **isCacheValueProviderFn**<`T`\>(`fn`): fn is CacheValueProviderFn<T\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | `unknown` |

#### Returns

fn is CacheValueProviderFn<T\>

___

### isConnectedCache

▸ `Static` **isConnectedCache**<`T`\>(`adapter`): adapter is ConnectedCacheInterface<T\>

Check whether a cache adapter implements ConnectedAdapterInterface
and has a getConnection() method

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `adapter` | `CacheOrConnectedCache` |

#### Returns

adapter is ConnectedCacheInterface<T\>

___

### isNonEmptyString

▸ `Static` **isNonEmptyString**(`value`, `trim?`): value is string

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `value` | `unknown` | `undefined` |
| `trim` | `boolean` | `true` |

#### Returns

value is string

___

### isValidCacheKey

▸ `Static` **isValidCacheKey**<`K`\>(`key`): key is K

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` = `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `unknown` |

#### Returns

key is K

___

### isValidRedisValue

▸ `Static` **isValidRedisValue**(`value`): value is string

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `unknown` |

#### Returns

value is string
