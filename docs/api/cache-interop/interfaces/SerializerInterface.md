[@soluble/cache-interop - v0.9.1](../README.md) / SerializerInterface

# Interface: SerializerInterface

## Implemented by

- [`NativeJsonSerializer`](../classes/NativeJsonSerializer.md)

## Table of contents

### Methods

- [decode](SerializerInterface.md#decode)
- [encode](SerializerInterface.md#encode)

## Methods

### decode

▸ **decode**<`TOutput`\>(`value`): `TOutput`

**`throws`** SyntaxError

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TOutput` | extends `JsonType` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`TOutput`

___

### encode

▸ **encode**<`TInput`\>(`value`): `string`

**`throws`** TypeError

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TInput` | extends `JsonType` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `TInput` |

#### Returns

`string`
