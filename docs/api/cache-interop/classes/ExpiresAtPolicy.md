[@soluble/cache-interop - v0.9.1](../README.md) / ExpiresAtPolicy

# Class: ExpiresAtPolicy

## Implements

- [`EvictionPolicyInterface`](../interfaces/EvictionPolicyInterface.md)

## Table of contents

### Constructors

- [constructor](ExpiresAtPolicy.md#constructor)

### Methods

- [isExpired](ExpiresAtPolicy.md#isexpired)

## Constructors

### constructor

• **new ExpiresAtPolicy**(`options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Object` |
| `options.dateProvider?` | `DateProvider` |

## Methods

### isExpired

▸ **isExpired**(`expiresAt`): `boolean`

Checks whether a expiration unix time is still valid

**`throws`** InvalidArgumentException

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expiresAt` | `number` | UnixTime expressed in seconds |

#### Returns

`boolean`

#### Implementation of

[EvictionPolicyInterface](../interfaces/EvictionPolicyInterface.md).[isExpired](../interfaces/EvictionPolicyInterface.md#isexpired)
