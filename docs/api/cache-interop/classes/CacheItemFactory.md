[@soluble/cache-interop - v0.12.5](../README.md) / CacheItemFactory

# Class: CacheItemFactory

## Table of contents

### Constructors

- [constructor](CacheItemFactory.md#constructor)

### Methods

- [fromCacheMiss](CacheItemFactory.md#fromcachemiss)
- [fromErr](CacheItemFactory.md#fromerr)
- [fromInvalidCacheKey](CacheItemFactory.md#frominvalidcachekey)
- [fromOk](CacheItemFactory.md#fromok)

## Constructors

### constructor

• **new CacheItemFactory**()

## Methods

### fromCacheMiss

▸ `Static` **fromCacheMiss**<`T`, `K`\>(`props`): [`CacheItem`](CacheItem.md)<`null` \| `T`, `K`\>

#### Type parameters

| Name | Type                        |
| :--- | :-------------------------- |
| `T`  | `T`                         |
| `K`  | extends `string` = `string` |

#### Parameters

| Name    | Type                                                                                                                                              |
| :------ | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| `props` | `Omit`<`CacheItemPropsOk`<`null` \| `T`, `K`\>, `"success"` \| `"isHit"` \| `"data"`\> & { `data?`: `undefined` ; `defaultValue`: `null` \| `T` } |

#### Returns

[`CacheItem`](CacheItem.md)<`null` \| `T`, `K`\>

---

### fromErr

▸ `Static` **fromErr**<`K`\>(`props`): [`CacheItem`](CacheItem.md)<`null`, `K`\>

#### Type parameters

| Name | Type                        |
| :--- | :-------------------------- |
| `K`  | extends `string` = `string` |

#### Parameters

| Name    | Type                                            |
| :------ | :---------------------------------------------- |
| `props` | `Omit`<`CacheItemPropsErr`<`K`\>, `"success"`\> |

#### Returns

[`CacheItem`](CacheItem.md)<`null`, `K`\>

---

### fromInvalidCacheKey

▸ `Static` **fromInvalidCacheKey**(`key`): [`CacheItem`](CacheItem.md)<`null`, `string`\>

#### Parameters

| Name  | Type      |
| :---- | :-------- |
| `key` | `unknown` |

#### Returns

[`CacheItem`](CacheItem.md)<`null`, `string`\>

---

### fromOk

▸ `Static` **fromOk**<`T`, `K`\>(`props`): [`CacheItem`](CacheItem.md)<`T`, `K`\>

#### Type parameters

| Name | Type                        |
| :--- | :-------------------------- |
| `T`  | `T`                         |
| `K`  | extends `string` = `string` |

#### Parameters

| Name    | Type                                                |
| :------ | :-------------------------------------------------- |
| `props` | `Omit`<`CacheItemPropsOk`<`T`, `K`\>, `"success"`\> |

#### Returns

[`CacheItem`](CacheItem.md)<`T`, `K`\>
