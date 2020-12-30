import { ParsedDsn } from './dsn-parser';

export const errorReasons = {
  EMPTY_DSN: 'DSN cannot be empty',
  INVALID_ARGUMENT: 'DSN must be a string',
  PARSE_ERROR: 'Cannot parse DSN',
  INVALID_PORT: 'Invalid port',
} as const;

export type ErrorReasons = keyof typeof errorReasons;

type ParserSuccessResult = {
  success: true;
  value: ParsedDsn;
};

export type ParserErrorResult = {
  success: false;
  reason: ErrorReasons;
  message: string;
};

export type ParserResult = ParserSuccessResult | ParserErrorResult;

export type ParsableDsn = string;
