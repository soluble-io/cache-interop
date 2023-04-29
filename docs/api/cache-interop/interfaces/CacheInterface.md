[@soluble/cache-interop - v0.12.5](../README.md) / CacheInterface

# Interface: CacheInterface<TBase, KBase\>

## Type parameters

| Name    | Type                                |
| :------ | :---------------------------------- |
| `TBase` | `string`                            |
| `KBase` | [`CacheKey`](../README.md#cachekey) |

## Implemented by

- [`AbstractCacheAdapter`](../classes/AbstractCacheAdapter.md)
- [`MapCacheAdapter`](../classes/MapCacheAdapter.md)

## Table of contents

### Methods

- [clear](CacheInterface.md#clear)
- [delete](CacheInterface.md#delete)
- [deleteMultiple](CacheInterface.md#deletemultiple)
- [get](CacheInterface.md#get)
- [getMultiple](CacheInterface.md#getmultiple)
- [getOrSet](CacheInterface.md#getorset)
- [has](CacheInterface.md#has)
- [set](CacheInterface.md#set)
- [setMultiple](CacheInterface.md#setmultiple)

## Methods

### clear

▸ **clear**(): `Promise`<`true` \| [`CacheException`](../classes/CacheException.md)\>

Delete the entire cache's keys.

#### Returns

`Promise`<`true` \| [`CacheException`](../classes/CacheException.md)\>

bool True on success and CacheException on failure.

---

### delete

▸ **delete**<`K`\>(`key`, `options?`): `Promise`<`boolean` \| [`CacheException`](../classes/CacheException.md)\>

Delete an item from the cache by its unique key.

#### Type parameters

| Name | Type    |
| :--- | :------ |
| `K`  | `KBase` |

#### Parameters

| Name       | Type                                          | Description                                 |
| :--------- | :-------------------------------------------- | :------------------------------------------ |
| `key`      | `K`                                           | The unique cache key of the item to delete. |
| `options?` | [`DeleteOptions`](../README.md#deleteoptions) | -                                           |

#### Returns

`Promise`<`boolean` \| [`CacheException`](../classes/CacheException.md)\>

True if the item was successfully removed, false if it did not exists.
CacheException if there was an error.

---

### deleteMultiple

▸ **deleteMultiple**<`K`\>(`keys`, `options?`): `Promise`<`Map`<`K`, `boolean` \| [`CacheException`](../classes/CacheException.md)\>\>

Delete cache entries from multiple keys

#### Type parameters

| Name | Type    |
| :--- | :------ |
| `K`  | `KBase` |

#### Parameters

| Name       | Type                                          | Description                            |
| :--------- | :-------------------------------------------- | :------------------------------------- |
| `keys`     | `K`[]                                         | A list of keys that should be deleted. |
| `options?` | [`DeleteOptions`](../README.md#deleteoptions) | -                                      |

#### Returns

`Promise`<`Map`<`K`, `boolean` \| [`CacheException`](../classes/CacheException.md)\>\>

---

### get

▸ **get**<`T`, `K`\>(`key`, `options?`): `Promise`<[`CacheItemInterface`](CacheItemInterface.md)<`T`, `string`\>\>

Fetches a value from the cache

#### Type parameters

| Name | Type    |
| :--- | :------ |
| `T`  | `TBase` |
| `K`  | `KBase` |

#### Parameters

| Name       | Type                                          | Description                               |
| :--------- | :-------------------------------------------- | :---------------------------------------- |
| `key`      | `K`                                           | The unique key of this item in the cache. |
| `options?` | [`GetOptions`](../README.md#getoptions)<`T`\> | An object holding GetOptions              |

#### Returns

`Promise`<[`CacheItemInterface`](CacheItemInterface.md)<`T`, `string`\>\>

A promise returning a CacheItemInterface, or defaultValue in case of cache miss.

---

### getMultiple

▸ **getMultiple**<`T`, `K`\>(`keys`, `options?`): `Promise`<`Map`<`K`, [`CacheItemInterface`](CacheItemInterface.md)<`T`, `string`\>\>\>

Obtains multiple cache items by their unique keys.

#### Type parameters

| Name | Type    |
| :--- | :------ |
| `T`  | `TBase` |
| `K`  | `KBase` |

#### Parameters

| Name       | Type                                          | Description                                             |
| :--------- | :-------------------------------------------- | :------------------------------------------------------ |
| `keys`     | `K`[]                                         | A list of keys that can obtained in a single operation. |
| `options?` | [`GetOptions`](../README.md#getoptions)<`T`\> | -                                                       |

#### Returns

`Promise`<`Map`<`K`, [`CacheItemInterface`](CacheItemInterface.md)<`T`, `string`\>\>\>

---

### getOrSet

▸ **getOrSet**<`T`, `K`\>(`key`, `value`, `options?`): `Promise`<[`CacheItemInterface`](CacheItemInterface.md)<`T`, `string`\>\>

#### Type parameters

| Name | Type    |
| :--- | :------ |
| `T`  | `TBase` |
| `K`  | `KBase` |

#### Parameters

| Name       | Type                                                                     |
| :--------- | :----------------------------------------------------------------------- |
| `key`      | `K`                                                                      |
| `value`    | `T` \| [`CacheValueProviderFn`](../README.md#cachevalueproviderfn)<`T`\> |
| `options?` | [`GetOrSetOptions`](../README.md#getorsetoptions)                        |

#### Returns

`Promise`<[`CacheItemInterface`](CacheItemInterface.md)<`T`, `string`\>\>

---

### has

▸ **has**<`K`\>(`key`, `options?`): `Promise`<`undefined` \| `boolean`\>

Determines whether an item is present in the cache.

NOTE: It is recommended that has() is only to be used for cache warming type purposes
and not to be used within your live applications operations for get/set, as this method
is subject to a race condition where your has() will return true and immediately after,
another script can remove it, making the state of your app out of date.

#### Type parameters

| Name | Type    |
| :--- | :------ |
| `K`  | `KBase` |

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

---

### set

▸ **set**<`T`, `K`\>(`key`, `value`, `options?`): `Promise`<`boolean` \| [`CacheException`](../classes/CacheException.md)\>

Persists data in the cache, uniquely referenced by a key.

#### Type parameters

| Name | Type    |
| :--- | :------ |
| `T`  | `TBase` |
| `K`  | `KBase` |

#### Parameters

| Name       | Type                                                                     | Description                                                                             |
| :--------- | :----------------------------------------------------------------------- | :-------------------------------------------------------------------------------------- |
| `key`      | `K`                                                                      | The key of the item to store.                                                           |
| `value`    | `T` \| [`CacheValueProviderFn`](../README.md#cachevalueproviderfn)<`T`\> | The value of the item to store or a function returning the value. Must be serializable. |
| `options?` | [`SetOptions`](../README.md#setoptions)                                  | An object holding SetOptions                                                            |

#### Returns

`Promise`<`boolean` \| [`CacheException`](../classes/CacheException.md)\>

---

### setMultiple

▸ **setMultiple**<`T`, `K`\>(`keyVals`, `options?`): `Promise`<`Map`<`K`, `boolean` \| [`CacheException`](../classes/CacheException.md)\>\>

Persists a set of key => value pairs in the cache.

#### Type parameters

| Name | Type    |
| :--- | :------ |
| `T`  | `TBase` |
| `K`  | `KBase` |

#### Parameters

| Name       | Type                                                                                       | Description                             |
| :--------- | :----------------------------------------------------------------------------------------- | :-------------------------------------- |
| `keyVals`  | readonly [`K`, `T` \| [`CacheValueProviderFn`](../README.md#cachevalueproviderfn)<`T`\>][] | array of tuples container key and value |
| `options?` | [`SetOptions`](../README.md#setoptions)                                                    | -                                       |

#### Returns

`Promise`<`Map`<`K`, `boolean` \| [`CacheException`](../classes/CacheException.md)\>\>
