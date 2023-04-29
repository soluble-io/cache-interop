@soluble/cache-interop

# @soluble/cache-interop - v0.12.5

## Table of contents

### Classes

- [AbstractCacheAdapter](classes/AbstractCacheAdapter.md)
- [Asserts](classes/Asserts.md)
- [CacheException](classes/CacheException.md)
- [CacheItem](classes/CacheItem.md)
- [CacheItemFactory](classes/CacheItemFactory.md)
- [CacheProviderException](classes/CacheProviderException.md)
- [ErrorFormatter](classes/ErrorFormatter.md)
- [ErrorHelper](classes/ErrorHelper.md)
- [ExpiresAtPolicy](classes/ExpiresAtPolicy.md)
- [Guards](classes/Guards.md)
- [InvalidArgumentException](classes/InvalidArgumentException.md)
- [InvalidCacheKeyException](classes/InvalidCacheKeyException.md)
- [MapCacheAdapter](classes/MapCacheAdapter.md)
- [NativeJsonSerializer](classes/NativeJsonSerializer.md)
- [UnexpectedErrorException](classes/UnexpectedErrorException.md)
- [UnsupportedFeatureException](classes/UnsupportedFeatureException.md)
- [UnsupportedValueException](classes/UnsupportedValueException.md)

### Interfaces

- [CacheInterface](interfaces/CacheInterface.md)
- [CacheItemInterface](interfaces/CacheItemInterface.md)
- [ConnectedCacheInterface](interfaces/ConnectedCacheInterface.md)
- [ConnectionInterface](interfaces/ConnectionInterface.md)
- [EvictionPolicyInterface](interfaces/EvictionPolicyInterface.md)
- [SerializerInterface](interfaces/SerializerInterface.md)

### Type Aliases

- [CacheExpiresAt](README.md#cacheexpiresat)
- [CacheItemMetadata](README.md#cacheitemmetadata)
- [CacheKey](README.md#cachekey)
- [CacheProviderAsyncFn](README.md#cacheproviderasyncfn)
- [CacheProviderSyncFn](README.md#cacheprovidersyncfn)
- [CacheValueProviderFn](README.md#cachevalueproviderfn)
- [DeleteOptions](README.md#deleteoptions)
- [GetOptions](README.md#getoptions)
- [GetOrSetOptions](README.md#getorsetoptions)
- [HasOptions](README.md#hasoptions)
- [SetOptions](README.md#setoptions)

### Functions

- [executeValueProviderFn](README.md#executevalueproviderfn)

## Type Aliases

### CacheExpiresAt

Ƭ **CacheExpiresAt**: `number`

---

### CacheItemMetadata

Ƭ **CacheItemMetadata**<`K`\>: `Object`

#### Type parameters

| Name | Type                                                                        |
| :--- | :-------------------------------------------------------------------------- |
| `K`  | extends [`CacheKey`](README.md#cachekey) = [`CacheKey`](README.md#cachekey) |

#### Type declaration

| Name  | Type |
| :---- | :--- |
| `key` | `K`  |

---

### CacheKey

Ƭ **CacheKey**: `string`

---

### CacheProviderAsyncFn

Ƭ **CacheProviderAsyncFn**<`T`\>: (`params?`: `CacheValueProviderParams`) => `Promise`<`T`\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Type declaration

▸ (`params?`): `Promise`<`T`\>

##### Parameters

| Name      | Type                       |
| :-------- | :------------------------- |
| `params?` | `CacheValueProviderParams` |

##### Returns

`Promise`<`T`\>

---

### CacheProviderSyncFn

Ƭ **CacheProviderSyncFn**<`T`\>: (`params?`: `CacheValueProviderParams`) => `T`

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Type declaration

▸ (`params?`): `T`

##### Parameters

| Name      | Type                       |
| :-------- | :------------------------- |
| `params?` | `CacheValueProviderParams` |

##### Returns

`T`

---

### CacheValueProviderFn

Ƭ **CacheValueProviderFn**<`T`\>: [`CacheProviderAsyncFn`](README.md#cacheproviderasyncfn)<`T`\> \| [`CacheProviderSyncFn`](README.md#cacheprovidersyncfn)<`T`\>

#### Type parameters

| Name |
| :--- |
| `T`  |

---

### DeleteOptions

Ƭ **DeleteOptions**: `Object`

#### Type declaration

| Name            | Type      | Description                                  |
| :-------------- | :-------- | :------------------------------------------- |
| `disableCache?` | `boolean` | Whether to disable caching, by default false |

---

### GetOptions

Ƭ **GetOptions**<`T`\>: `Object`

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Type declaration

| Name            | Type      |
| :-------------- | :-------- |
| `defaultValue?` | `T`       |
| `disableCache?` | `boolean` |

---

### GetOrSetOptions

Ƭ **GetOrSetOptions**: `Omit`<[`SetOptions`](README.md#setoptions), `"disableCache"`\> & { `disableCache?`: `boolean` \| { `read`: `boolean` ; `write`: `boolean` } ; `onError?`: (`errors`: [`CacheException`](classes/CacheException.md)[]) => `void` }

---

### HasOptions

Ƭ **HasOptions**: `Object`

#### Type declaration

| Name            | Type                                                               | Description                                                    |
| :-------------- | :----------------------------------------------------------------- | :------------------------------------------------------------- |
| `disableCache?` | `boolean`                                                          | Whether to disable caching, by default false                   |
| `onError?`      | (`error`: [`CacheException`](classes/CacheException.md)) => `void` | Callback since Cache.has can't really return CacheException... |

---

### SetOptions

Ƭ **SetOptions**: `Object`

#### Type declaration

| Name            | Type      | Description                                          |
| :-------------- | :-------- | :--------------------------------------------------- |
| `disableCache?` | `boolean` | Whether to disable caching, by default false         |
| `ttl?`          | `number`  | Time-To-Live expressed in seconds, 0 meaning forever |

## Functions

### executeValueProviderFn

▸ **executeValueProviderFn**<`T`\>(`syncOrAsyncFn`): `Promise`<`T`\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name            | Type                                                 |
| :-------------- | :--------------------------------------------------- |
| `syncOrAsyncFn` | `AsyncFn`<`T`\> \| `SyncFn`<`T`\> \| `Promise`<`T`\> |

#### Returns

`Promise`<`T`\>
