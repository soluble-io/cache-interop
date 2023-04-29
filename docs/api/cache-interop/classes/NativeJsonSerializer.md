[@soluble/cache-interop - v0.12.5](../README.md) / NativeJsonSerializer

# Class: NativeJsonSerializer

## Implements

- [`SerializerInterface`](../interfaces/SerializerInterface.md)

## Table of contents

### Constructors

- [constructor](NativeJsonSerializer.md#constructor)

### Methods

- [decode](NativeJsonSerializer.md#decode)
- [encode](NativeJsonSerializer.md#encode)

## Constructors

### constructor

• **new NativeJsonSerializer**()

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

#### Implementation of

[SerializerInterface](../interfaces/SerializerInterface.md).[decode](../interfaces/SerializerInterface.md#decode)

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

#### Implementation of

[SerializerInterface](../interfaces/SerializerInterface.md).[encode](../interfaces/SerializerInterface.md#encode)
