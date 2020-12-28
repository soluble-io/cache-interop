import type { ErrorReasons, ParserErrorResult } from './dsn-parser.type';
import { errorReasons } from './dsn-parser.type';

export const createErrorResult = (reason: ErrorReasons, msg?: string): ParserErrorResult => {
  return {
    success: false,
    reason: reason,
    message: msg || errorReasons[reason],
  };
};

export const isNonEmptyString = (value: unknown, trim = true): value is string => {
  return typeof value === 'string' && (trim ? value.trim() : value).length > 0;
};

export const isParsableNumber = (value: unknown): value is number => {
  return typeof value === 'string' && /^-?\d{1,16}$/.test(value);
};

export const isValidHttpPort = (port: number): port is number => {
  return port < 65536 && port > 0;
};
