[@soluble/cache-interop - v0.12.5](../README.md) / ErrorHelper

# Class: ErrorHelper

## Table of contents

### Constructors

- [constructor](ErrorHelper.md#constructor)

### Methods

- [formatMsg](ErrorHelper.md#formatmsg)
- [getCacheException](ErrorHelper.md#getcacheexception)
- [getCacheProviderException](ErrorHelper.md#getcacheproviderexception)
- [getInvalidCacheKeyException](ErrorHelper.md#getinvalidcachekeyexception)
- [getUnexpectedErrorException](ErrorHelper.md#getunexpectederrorexception)
- [getUnsupportedValueException](ErrorHelper.md#getunsupportedvalueexception)

## Constructors

### constructor

• **new ErrorHelper**(`adapterName`)

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `adapterName` | `string` |

## Methods

### formatMsg

▸ **formatMsg**(`method`, `reason`, `detail?`): `string`

#### Parameters

| Name      | Type                                                                                                                                                                           |
| :-------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `method`  | `CallerMethod`                                                                                                                                                                 |
| `reason`  | `"INVALID_KEY"` \| `"WRITE_ERROR"` \| `"READ_ERROR"` \| `"COMMAND_ERROR"` \| `"VALUE_PROVIDER_ERROR"` \| `"UNEXPECTED_REPLY"` \| `"UNSUPPORTED_VALUE"` \| `"UNEXPECTED_ERROR"` |
| `detail?` | `null` \| `string`                                                                                                                                                             |

#### Returns

`string`

---

### getCacheException

▸ **getCacheException**(`method`, `reason`, `previous?`): [`CacheException`](CacheException.md)

#### Parameters

| Name        | Type                                                                                                                                                                           |
| :---------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `method`    | `CallerMethod`                                                                                                                                                                 |
| `reason`    | `"INVALID_KEY"` \| `"WRITE_ERROR"` \| `"READ_ERROR"` \| `"COMMAND_ERROR"` \| `"VALUE_PROVIDER_ERROR"` \| `"UNEXPECTED_REPLY"` \| `"UNSUPPORTED_VALUE"` \| `"UNEXPECTED_ERROR"` |
| `previous?` | `Error`                                                                                                                                                                        |

#### Returns

[`CacheException`](CacheException.md)

---

### getCacheProviderException

▸ **getCacheProviderException**(`method`, `previous?`): [`CacheProviderException`](CacheProviderException.md)

#### Parameters

| Name        | Type           |
| :---------- | :------------- |
| `method`    | `CallerMethod` |
| `previous?` | `Error`        |

#### Returns

[`CacheProviderException`](CacheProviderException.md)

---

### getInvalidCacheKeyException

▸ **getInvalidCacheKeyException**(`«destructured»`): [`InvalidCacheKeyException`](InvalidCacheKeyException.md)

#### Parameters

| Name             | Type            |
| :--------------- | :-------------- |
| `«destructured»` | `MethodWithKey` |

#### Returns

[`InvalidCacheKeyException`](InvalidCacheKeyException.md)

---

### getUnexpectedErrorException

▸ **getUnexpectedErrorException**(`method`, `previous?`): [`UnexpectedErrorException`](UnexpectedErrorException.md)

#### Parameters

| Name        | Type           |
| :---------- | :------------- |
| `method`    | `CallerMethod` |
| `previous?` | `Error`        |

#### Returns

[`UnexpectedErrorException`](UnexpectedErrorException.md)

---

### getUnsupportedValueException

▸ **getUnsupportedValueException**(`method`, `v`): [`UnsupportedValueException`](UnsupportedValueException.md)

#### Parameters

| Name     | Type           |
| :------- | :------------- |
| `method` | `CallerMethod` |
| `v`      | `unknown`      |

#### Returns

[`UnsupportedValueException`](UnsupportedValueException.md)
