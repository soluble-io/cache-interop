@soluble/dsn-parser

# @soluble/dsn-parser - v1.9.0

## Table of contents

### Type Aliases

- [ParsableDsn](README.md#parsabledsn)
- [ParseDsnOptions](README.md#parsedsnoptions)
- [ParsedDsn](README.md#parseddsn)

### Functions

- [assertParsableDsn](README.md#assertparsabledsn)
- [isParsableDsn](README.md#isparsabledsn)
- [parseDsn](README.md#parsedsn)
- [parseDsnOrThrow](README.md#parsedsnorthrow)

## Type Aliases

### ParsableDsn

Ƭ **ParsableDsn**: `string`

---

### ParseDsnOptions

Ƭ **ParseDsnOptions**: `Object`

#### Type declaration

| Name               | Type                                                                | Description                                                |
| :----------------- | :------------------------------------------------------------------ | :--------------------------------------------------------- |
| `lowercaseDriver?` | `boolean`                                                           | Whether to lowercase parsed driver name, default: false    |
| `overrides?`       | `Omit`<`Partial`<[`ParsedDsn`](README.md#parseddsn)\>, `"params"`\> | Overrides parsed values by those one (except query params) |

---

### ParsedDsn

Ƭ **ParsedDsn**: `Object`

#### Type declaration

| Name      | Type                                                   | Description  |
| :-------- | :----------------------------------------------------- | :----------- |
| `db?`     | `string`                                               | -            |
| `driver`  | `string`                                               | -            |
| `host`    | `string`                                               | -            |
| `params?` | `Record`<`string`, `number` \| `string` \| `boolean`\> | Query params |
| `pass?`   | `string`                                               | -            |
| `port?`   | `number`                                               | -            |
| `user?`   | `string`                                               | -            |

## Functions

### assertParsableDsn

▸ **assertParsableDsn**(`dsn`, `msg?`): asserts dsn is string

**`Throws`**

Error when not parsable

#### Parameters

| Name   | Type      |
| :----- | :-------- |
| `dsn`  | `unknown` |
| `msg?` | `string`  |

#### Returns

asserts dsn is string

---

### isParsableDsn

▸ **isParsableDsn**(`dsn`): dsn is string

#### Parameters

| Name  | Type      |
| :---- | :-------- |
| `dsn` | `unknown` |

#### Returns

dsn is string

---

### parseDsn

▸ **parseDsn**(`dsn`, `options?`): `ParserResult`

#### Parameters

| Name       | Type                                           |
| :--------- | :--------------------------------------------- |
| `dsn`      | `unknown`                                      |
| `options?` | [`ParseDsnOptions`](README.md#parsedsnoptions) |

#### Returns

`ParserResult`

---

### parseDsnOrThrow

▸ **parseDsnOrThrow**(`dsn`, `options?`): [`ParsedDsn`](README.md#parseddsn)

#### Parameters

| Name       | Type                                                                             |
| :--------- | :------------------------------------------------------------------------------- |
| `dsn`      | `unknown`                                                                        |
| `options?` | [`ParseDsnOptions`](README.md#parsedsnoptions) & { `errorMsgPrefix?`: `string` } |

#### Returns

[`ParsedDsn`](README.md#parseddsn)
