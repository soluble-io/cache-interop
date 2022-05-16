[@soluble/cache-interop - v0.9.1](../README.md) / MapCacheAdapter

# Class: MapCacheAdapter<TBase, KBase\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `TBase` | `string` |
| `KBase` | extends [`CacheKey`](../README.md#cachekey) = [`CacheKey`](../README.md#cachekey) |

## Hierarchy

- [`AbstractCacheAdapter`](AbstractCacheAdapter.md)<`TBase`, `KBase`\>

  ↳ **`MapCacheAdapter`**

## Implements

- [`CacheInterface`](../interfaces/CacheInterface.md)<`TBase`, `KBase`\>

## Table of contents

### Constructors

- [constructor](MapCacheAdapter.md#constructor)

### Properties

- [adapterName](MapCacheAdapter.md#adaptername)

### Accessors

- [errorHelper](MapCacheAdapter.md#errorhelper)

### Methods

- [clear](MapCacheAdapter.md#clear)
- [delete](MapCacheAdapter.md#delete)
- [deleteMultiple](MapCacheAdapter.md#deletemultiple)
- [get](MapCacheAdapter.md#get)
- [getMultiple](MapCacheAdapter.md#getmultiple)
- [getOrSet](MapCacheAdapter.md#getorset)
- [has](MapCacheAdapter.md#has)
- [set](MapCacheAdapter.md#set)
- [setMultiple](MapCacheAdapter.md#setmultiple)

## Constructors

### constructor

• **new MapCacheAdapter**<`TBase`, `KBase`\>(`options?`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TBase` | `string` |
| `KBase` | extends `string` = `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Options` |

#### Overrides

[AbstractCacheAdapter](AbstractCacheAdapter.md).[constructor](AbstractCacheAdapter.md#constructor)

## Properties

### adapterName

• `Readonly` **adapterName**: `string`

#### Overrides

[AbstractCacheAdapter](AbstractCacheAdapter.md).[adapterName](AbstractCacheAdapter.md#adaptername)

## Accessors

### errorHelper

• `get` **errorHelper**(): [`ErrorHelper`](ErrorHelper.md)

#### Returns

[`ErrorHelper`](ErrorHelper.md)

#### Inherited from

AbstractCacheAdapter.errorHelper

## Methods

### clear

▸ **clear**(): `Promise`<``true``\>

Delete the entire cache's keys.

#### Returns

`Promise`<``true``\>

bool True on success and CacheException on failure.

#### Implementation of

[CacheInterface](../interfaces/CacheInterface.md).[clear](../interfaces/CacheInterface.md#clear)

#### Overrides

[AbstractCacheAdapter](AbstractCacheAdapter.md).[clear](AbstractCacheAdapter.md#clear)

___

### delete

▸ **delete**<`K`\>(`key`, `options?`): `Promise`<`boolean` \| [`CacheException`](CacheException.md)\>

Delete an item from the cache by its unique key.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` = `KBase` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `K` |
| `options?` | [`DeleteOptions`](../README.md#deleteoptions) |

#### Returns

`Promise`<`boolean` \| [`CacheException`](CacheException.md)\>

True if the item was successfully removed, false if it did not exists.
        CacheException if there was an error.

#### Implementation of

[CacheInterface](../interfaces/CacheInterface.md).[delete](../interfaces/CacheInterface.md#delete)

#### Overrides

[AbstractCacheAdapter](AbstractCacheAdapter.md).[delete](AbstractCacheAdapter.md#delete)

___

### deleteMultiple

▸ **deleteMultiple**<`K`\>(`keys`, `options?`): `Promise`<`Map`<`K`, `boolean` \| [`CacheException`](CacheException.md)\>\>

Delete cache entries from multiple keys

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` = `KBase` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `keys` | `K`[] |
| `options?` | [`DeleteOptions`](../README.md#deleteoptions) |

#### Returns

`Promise`<`Map`<`K`, `boolean` \| [`CacheException`](CacheException.md)\>\>

#### Implementation of

[CacheInterface](../interfaces/CacheInterface.md).[deleteMultiple](../interfaces/CacheInterface.md#deletemultiple)

#### Inherited from

[AbstractCacheAdapter](AbstractCacheAdapter.md).[deleteMultiple](AbstractCacheAdapter.md#deletemultiple)

___

### get

▸ **get**<`T`, `K`\>(`key`, `options?`): `Promise`<[`CacheItemInterface`](../interfaces/CacheItemInterface.md)<`T`, `string`\>\>

Fetches a value from the cache

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `TBase` |
| `K` | extends `string` = `KBase` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `K` |
| `options?` | [`GetOptions`](../README.md#getoptions)<`T`\> |

#### Returns

`Promise`<[`CacheItemInterface`](../interfaces/CacheItemInterface.md)<`T`, `string`\>\>

A promise returning a CacheItemInterface, or defaultValue in case of cache miss.

#### Implementation of

[CacheInterface](../interfaces/CacheInterface.md).[get](../interfaces/CacheInterface.md#get)

#### Overrides

[AbstractCacheAdapter](AbstractCacheAdapter.md).[get](AbstractCacheAdapter.md#get)

___

### getMultiple

▸ **getMultiple**<`T`, `K`\>(`keys`, `options?`): `Promise`<`Map`<`K`, [`CacheItemInterface`](../interfaces/CacheItemInterface.md)<`T`, `string`\>\>\>

Obtains multiple cache items by their unique keys.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `TBase` |
| `K` | extends `string` = `KBase` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `keys` | `K`[] |
| `options?` | [`GetOptions`](../README.md#getoptions)<`T`\> |

#### Returns

`Promise`<`Map`<`K`, [`CacheItemInterface`](../interfaces/CacheItemInterface.md)<`T`, `string`\>\>\>

#### Implementation of

[CacheInterface](../interfaces/CacheInterface.md).[getMultiple](../interfaces/CacheInterface.md#getmultiple)

#### Inherited from

[AbstractCacheAdapter](AbstractCacheAdapter.md).[getMultiple](AbstractCacheAdapter.md#getmultiple)

___

### getOrSet

▸ **getOrSet**<`T`, `K`\>(`key`, `value`, `options?`): `Promise`<[`CacheItemInterface`](../interfaces/CacheItemInterface.md)<`T`, `string`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `TBase` |
| `K` | extends `string` = `KBase` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `K` |
| `value` | `T` \| [`CacheValueProviderFn`](../README.md#cachevalueproviderfn)<`T`\> |
| `options?` | [`GetOrSetOptions`](../README.md#getorsetoptions) |

#### Returns

`Promise`<[`CacheItemInterface`](../interfaces/CacheItemInterface.md)<`T`, `string`\>\>

#### Implementation of

[CacheInterface](../interfaces/CacheInterface.md).[getOrSet](../interfaces/CacheInterface.md#getorset)

#### Inherited from

[AbstractCacheAdapter](AbstractCacheAdapter.md).[getOrSet](AbstractCacheAdapter.md#getorset)

___

### has

▸ **has**<`K`\>(`key`, `options?`): `Promise`<`undefined` \| `boolean`\>

Determines whether an item is present in the cache.

NOTE: It is recommended that has() is only to be used for cache warming type purposes
and not to be used within your live applications operations for get/set, as this method
is subject to a race condition where your has() will return true and immediately after,
another script can remove it, making the state of your app out of date.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` = `KBase` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `K` |
| `options?` | [`HasOptions`](../README.md#hasoptions) |

#### Returns

`Promise`<`undefined` \| `boolean`\>

True if the item exists in the cache and was removed, false otherwise.
        Undefined is used to determine if the operation was successful.
        If cacheDisabled option is set to true, it will always return false.

#### Implementation of

[CacheInterface](../interfaces/CacheInterface.md).[has](../interfaces/CacheInterface.md#has)

#### Overrides

[AbstractCacheAdapter](AbstractCacheAdapter.md).[has](AbstractCacheAdapter.md#has)

___

### set

▸ **set**<`T`, `K`\>(`key`, `value`, `options?`): `Promise`<`boolean` \| [`CacheException`](CacheException.md)\>

Persists data in the cache, uniquely referenced by a key.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `TBase` |
| `K` | extends `string` = `KBase` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `K` |
| `value` | `T` \| [`CacheValueProviderFn`](../README.md#cachevalueproviderfn)<`T`\> |
| `options?` | [`SetOptions`](../README.md#setoptions) |

#### Returns

`Promise`<`boolean` \| [`CacheException`](CacheException.md)\>

#### Implementation of

[CacheInterface](../interfaces/CacheInterface.md).[set](../interfaces/CacheInterface.md#set)

#### Overrides

[AbstractCacheAdapter](AbstractCacheAdapter.md).[set](AbstractCacheAdapter.md#set)

___

### setMultiple

▸ **setMultiple**<`T`, `K`\>(`keyVals`, `options?`): `Promise`<`Map`<`K`, `boolean` \| [`CacheException`](CacheException.md)\>\>

Persists a set of key => value pairs in the cache.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `TBase` |
| `K` | extends `string` = `KBase` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `keyVals` | readonly [`K`, `T` \| [`CacheValueProviderFn`](../README.md#cachevalueproviderfn)<`T`\>][] |
| `options?` | [`SetOptions`](../README.md#setoptions) |

#### Returns

`Promise`<`Map`<`K`, `boolean` \| [`CacheException`](CacheException.md)\>\>

#### Implementation of

[CacheInterface](../interfaces/CacheInterface.md).[setMultiple](../interfaces/CacheInterface.md#setmultiple)

#### Inherited from

[AbstractCacheAdapter](AbstractCacheAdapter.md).[setMultiple](AbstractCacheAdapter.md#setmultiple)
