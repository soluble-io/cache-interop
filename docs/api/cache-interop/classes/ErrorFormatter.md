[@soluble/cache-interop - v0.9.1](../README.md) / ErrorFormatter

# Class: ErrorFormatter

## Table of contents

### Constructors

- [constructor](ErrorFormatter.md#constructor)

### Properties

- [adapterName](ErrorFormatter.md#adaptername)

### Methods

- [getMsg](ErrorFormatter.md#getmsg)

## Constructors

### constructor

• **new ErrorFormatter**(`adapterName`, `limitDetail?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `adapterName` | `string` | `undefined` |
| `limitDetail` | `number` | `40` |

## Properties

### adapterName

• `Readonly` **adapterName**: `string`

## Methods

### getMsg

▸ **getMsg**(`method`, `reason`, `detail?`, `msg?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `method` | `CallerMethod` |
| `reason` | ``"INVALID_KEY"`` \| ``"WRITE_ERROR"`` \| ``"READ_ERROR"`` \| ``"COMMAND_ERROR"`` \| ``"VALUE_PROVIDER_ERROR"`` \| ``"UNEXPECTED_REPLY"`` \| ``"UNSUPPORTED_VALUE"`` \| ``"UNEXPECTED_ERROR"`` |
| `detail?` | ``null`` \| `string` |
| `msg?` | `string` |

#### Returns

`string`
