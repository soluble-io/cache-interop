import { ParsedDsn, errorReasons, supportedDrivers } from './dsn-parser';

export type SupportedDrivers = typeof supportedDrivers[number];
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
