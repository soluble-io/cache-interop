[@soluble/cache-interop - v0.12.5](../README.md) / AbstractCacheAdapter

# Class: AbstractCacheAdapter<TBase, KBase\>

## Type parameters

| Name    | Type                                                                              |
| :------ | :-------------------------------------------------------------------------------- |
| `TBase` | `string`                                                                          |
| `KBase` | extends [`CacheKey`](../README.md#cachekey) = [`CacheKey`](../README.md#cachekey) |

## Hierarchy

- **`AbstractCacheAdapter`**

  ↳ [`MapCacheAdapter`](MapCacheAdapter.md)

## Implements

- [`CacheInterface`](../interfaces/CacheInterface.md)<`TBase`, `KBase`\>

## Table of contents

### Constructors

- [constructor](AbstractCacheAdapter.md#constructor)

### Properties

- [adapterName](AbstractCacheAdapter.md#adaptername)

### Accessors

- [errorHelper](AbstractCacheAdapter.md#errorhelper)

### Methods

- [clear](AbstractCacheAdapter.md#clear)
- [delete](AbstractCacheAdapter.md#delete)
- [deleteMultiple](AbstractCacheAdapter.md#deletemultiple)
- [get](AbstractCacheAdapter.md#get)
- [getMultiple](AbstractCacheAdapter.md#getmultiple)
- [getOrSet](AbstractCacheAdapter.md#getorset)
- [has](AbstractCacheAdapter.md#has)
- [set](AbstractCacheAdapter.md#set)
- [setMultiple](AbstractCacheAdapter.md#setmultiple)

## Constructors

### constructor

• **new AbstractCacheAdapter**<`TBase`, `KBase`\>()

#### Type parameters

| Name    | Type                        |
| :------ | :-------------------------- |
| `TBase` | `string`                    |
| `KBase` | extends `string` = `string` |

## Properties

### adapterName

• `Abstract` **adapterName**: `string`

## Accessors

### errorHelper

• `get` **errorHelper**(): [`ErrorHelper`](ErrorHelper.md)

#### Returns

[`ErrorHelper`](ErrorHelper.md)

## Methods

### clear

▸ `Abstract` **clear**(): `Promise`<`true` \| [`CacheException`](CacheException.md)\>

Delete the entire cache's keys.

#### Returns

`Promise`<`true` \| [`CacheException`](CacheException.md)\>

bool True on success and CacheException on failure.

#### Implementation of

[CacheInterface](../interfaces/CacheInterface.md).[clear](../interfaces/CacheInterface.md#clear)

---

### delete

▸ `Abstract` **delete**<`K`\>(`key`, `options?`): `Promise`<`boolean` \| [`CacheException`](CacheException.md)\>

Delete an item from the cache by its unique key.

#### Type parameters

| Name | Type                       |
| :--- | :------------------------- |
| `K`  | extends `string` = `KBase` |

#### Parameters

| Name       | Type                                          | Description                                 |
| :--------- | :-------------------------------------------- | :------------------------------------------ |
| `key`      | `K`                                           | The unique cache key of the item to delete. |
| `options?` | [`DeleteOptions`](../README.md#deleteoptions) | -                                           |

#### Returns

`Promise`<`boolean` \| [`CacheException`](CacheException.md)\>

True if the item was successfully removed, false if it did not exists.
CacheException if there was an error.

#### Implementation of

[CacheInterface](../interfaces/CacheInterface.md).[delete](../interfaces/CacheInterface.md#delete)

---

### deleteMultiple

▸ **deleteMultiple**<`K`\>(`keys`, `options?`): `Promise`<`Map`<`K`, `boolean` \| [`CacheException`](CacheException.md)\>\>

Delete cache entries from multiple keys

#### Type parameters

| Name | Type                       |
| :--- | :------------------------- |
| `K`  | extends `string` = `KBase` |

#### Parameters

| Name       | Type                                          | Description                            |
| :--------- | :-------------------------------------------- | :------------------------------------- |
| `keys`     | `K`[]                                         | A list of keys that should be deleted. |
| `options?` | [`DeleteOptions`](../README.md#deleteoptions) | -                                      |

#### Returns

`Promise`<`Map`<`K`, `boolean` \| [`CacheException`](CacheException.md)\>\>

#### Implementation of

[CacheInterface](../interfaces/CacheInterface.md).[deleteMultiple](../interfaces/CacheInterface.md#deletemultiple)

---

### get

▸ `Abstract` **get**<`T`, `K`\>(`key`, `options?`): `Promise`<[`CacheItemInterface`](../interfaces/CacheItemInterface.md)<`T`, `string`\>\>

Fetches a value from the cache

#### Type parameters

| Name | Type                       |
| :--- | :------------------------- |
| `T`  | `TBase`                    |
| `K`  | extends `string` = `KBase` |

#### Parameters

| Name       | Type                                          | Description                               |
| :--------- | :-------------------------------------------- | :---------------------------------------- |
| `key`      | `K`                                           | The unique key of this item in the cache. |
| `options?` | [`GetOptions`](../README.md#getoptions)<`T`\> | An object holding GetOptions              |

#### Returns

`Promise`<[`CacheItemInterface`](../interfaces/CacheItemInterface.md)<`T`, `string`\>\>

A promise returning a CacheItemInterface, or defaultValue in case of cache miss.

#### Implementation of

[CacheInterface](../interfaces/CacheInterface.md).[get](../interfaces/CacheInterface.md#get)

---

### getMultiple

▸ **getMultiple**<`T`, `K`\>(`keys`, `options?`): `Promise`<`Map`<`K`, [`CacheItemInterface`](../interfaces/CacheItemInterface.md)<`T`, `string`\>\>\>

Obtains multiple cache items by their unique keys.

#### Type parameters

| Name | Type                       |
| :--- | :------------------------- |
| `T`  | `TBase`                    |
| `K`  | extends `string` = `KBase` |

#### Parameters

| Name       | Type                                          | Description                                             |
| :--------- | :-------------------------------------------- | :------------------------------------------------------ |
| `keys`     | `K`[]                                         | A list of keys that can obtained in a single operation. |
| `options?` | [`GetOptions`](../README.md#getoptions)<`T`\> | -                                                       |

#### Returns

`Promise`<`Map`<`K`, [`CacheItemInterface`](../interfaces/CacheItemInterface.md)<`T`, `string`\>\>\>

#### Implementation of

[CacheInterface](../interfaces/CacheInterface.md).[getMultiple](../interfaces/CacheInterface.md#getmultiple)

---

### getOrSet

▸ **getOrSet**<`T`, `K`\>(`key`, `value`, `options?`): `Promise`<[`CacheItemInterface`](../interfaces/CacheItemInterface.md)<`T`, `string`\>\>

#### Type parameters

| Name | Type                       |
| :--- | :------------------------- |
| `T`  | `TBase`                    |
| `K`  | extends `string` = `KBase` |

#### Parameters

| Name       | Type                                                                     |
| :--------- | :----------------------------------------------------------------------- |
| `key`      | `K`                                                                      |
| `value`    | `T` \| [`CacheValueProviderFn`](../README.md#cachevalueproviderfn)<`T`\> |
| `options?` | [`GetOrSetOptions`](../README.md#getorsetoptions)                        |

#### Returns

`Promise`<[`CacheItemInterface`](../interfaces/CacheItemInterface.md)<`T`, `string`\>\>

#### Implementation of

[CacheInterface](../interfaces/CacheInterface.md).[getOrSet](../interfaces/CacheInterface.md#getorset)

---

### has

▸ `Abstract` **has**<`K`\>(`key`, `options?`): `Promise`<`undefined` \| `boolean`\>

Determines whether an item is present in the cache.

NOTE: It is recommended that has() is only to be used for cache warming type purposes
and not to be used within your live applications operations for get/set, as this method
is subject to a race condition where your has() will return true and immediately after,
another script can remove it, making the state of your app out of date.

#### Type parameters

| Name | Type                       |
| :--- | :------------------------- |
| `K`  | extends `string` = `KBase` |

#### Parameters

| Name       | Type                                    | Description        |
| :--------- | :-------------------------------------- | :----------------- |
| `key`      | `K`                                     | The cache item key |
| `options?` | [`HasOptions`](../README.md#hasoptions) | -                  |

#### Returns

`Promise`<`undefined` \| `boolean`\>

True if the item exists in the cache and was removed, false otherwise.
Undefined is used to determine if the operation was successful.
If cacheDisabled option is set to true, it will always return false.

#### Implementation of

[CacheInterface](../interfaces/CacheInterface.md).[has](../interfaces/CacheInterface.md#has)

---

### set

▸ `Abstract` **set**<`T`, `K`\>(`key`, `value`, `options?`): `Promise`<`boolean` \| [`CacheException`](CacheException.md)\>

Persists data in the cache, uniquely referenced by a key.

#### Type parameters

| Name | Type                       |
| :--- | :------------------------- |
| `T`  | `TBase`                    |
| `K`  | extends `string` = `KBase` |

#### Parameters

| Name       | Type                                                                     | Description                                                                             |
| :--------- | :----------------------------------------------------------------------- | :-------------------------------------------------------------------------------------- |
| `key`      | `K`                                                                      | The key of the item to store.                                                           |
| `value`    | `T` \| [`CacheValueProviderFn`](../README.md#cachevalueproviderfn)<`T`\> | The value of the item to store or a function returning the value. Must be serializable. |
| `options?` | [`SetOptions`](../README.md#setoptions)                                  | An object holding SetOptions                                                            |

#### Returns

`Promise`<`boolean` \| [`CacheException`](CacheException.md)\>

#### Implementation of

[CacheInterface](../interfaces/CacheInterface.md).[set](../interfaces/CacheInterface.md#set)

---

### setMultiple

▸ **setMultiple**<`T`, `K`\>(`keyVals`, `options?`): `Promise`<`Map`<`K`, `boolean` \| [`CacheException`](CacheException.md)\>\>

Persists a set of key => value pairs in the cache.

#### Type parameters

| Name | Type                       |
| :--- | :------------------------- |
| `T`  | `TBase`                    |
| `K`  | extends `string` = `KBase` |

#### Parameters

| Name       | Type                                                                                       | Description                             |
| :--------- | :----------------------------------------------------------------------------------------- | :-------------------------------------- |
| `keyVals`  | readonly [`K`, `T` \| [`CacheValueProviderFn`](../README.md#cachevalueproviderfn)<`T`\>][] | array of tuples container key and value |
| `options?` | [`SetOptions`](../README.md#setoptions)                                                    | -                                       |

#### Returns

`Promise`<`Map`<`K`, `boolean` \| [`CacheException`](CacheException.md)\>\>

#### Implementation of

[CacheInterface](../interfaces/CacheInterface.md).[setMultiple](../interfaces/CacheInterface.md#setmultiple)
