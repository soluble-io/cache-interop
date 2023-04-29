[@soluble/cache-interop - v0.12.5](../README.md) / ConnectionInterface

# Interface: ConnectionInterface<T\>

## Type parameters

| Name |
| :--- |
| `T`  |

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

---

### quit

▸ **quit**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>
