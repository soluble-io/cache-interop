[@soluble/cache-interop - v0.9.1](../README.md) / ConnectionInterface

# Interface: ConnectionInterface<T\>

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Methods

- [getNativeConnection](ConnectionInterface.md#getnativeconnection)
- [quit](ConnectionInterface.md#quit)

## Methods

### getNativeConnection

▸ **getNativeConnection**(): `T`

Get the underlying connection
Accessing the underlying connection is not guaranteed by
api stability.

#### Returns

`T`

___

### quit

▸ **quit**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>
