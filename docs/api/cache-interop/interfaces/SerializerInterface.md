[@soluble/cache-interop - v0.12.5](../README.md) / SerializerInterface

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

**`Throws`**

SyntaxError

#### Type parameters

| Name      | Type               |
| :-------- | :----------------- |
| `TOutput` | extends `JsonType` |

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `value` | `string` |

#### Returns

`TOutput`

---

### encode

▸ **encode**<`TInput`\>(`value`): `string`

**`Throws`**

TypeError

#### Type parameters

| Name     | Type               |
| :------- | :----------------- |
| `TInput` | extends `JsonType` |

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `value` | `TInput` |

#### Returns

`string`
