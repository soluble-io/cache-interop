@soluble/dsn-parser - v1.4.1

# @soluble/dsn-parser - v1.4.1

## Table of contents

### Type aliases

- [ParsableDsn](README.md#parsabledsn)
- [ParseDsnOptions](README.md#parsedsnoptions)
- [ParsedDsn](README.md#parseddsn)

### Functions

- [assertParsableDsn](README.md#assertparsabledsn)
- [parseDsn](README.md#parsedsn)

## Type aliases

### ParsableDsn

Ƭ **ParsableDsn**: `string`

___

### ParseDsnOptions

Ƭ **ParseDsnOptions**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `lowercaseDriver?` | `boolean` | Whether to lowercase parsed driver name, default: false |
| `overrides?` | `Omit`<`Partial`<[`ParsedDsn`](README.md#parseddsn)\>, ``"params"``\> | Overrides parsed values by those one (except query params) |

___

### ParsedDsn

Ƭ **ParsedDsn**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `db?` | `string` | - |
| `driver` | `string` | - |
| `host` | `string` | - |
| `params?` | `Record`<`string`, `number` \| `string` \| `boolean`\> | Query params |
| `pass?` | `string` | - |
| `port?` | `number` | - |
| `user?` | `string` | - |

## Functions

### assertParsableDsn

▸ **assertParsableDsn**(`dsn`, `msg?`): asserts dsn is string

**`throws`** Error when not parsable

#### Parameters

| Name | Type |
| :------ | :------ |
| `dsn` | `unknown` |
| `msg?` | `string` |

#### Returns

asserts dsn is string

___

### parseDsn

▸ **parseDsn**(`dsn`, `options?`): `ParserResult`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dsn` | `string` |
| `options?` | [`ParseDsnOptions`](README.md#parsedsnoptions) |

#### Returns

`ParserResult`
