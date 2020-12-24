import { CacheInteropDsn, errorReasons, supportedDrivers } from './cache-dsn-parser';

export type SupportedDrivers = typeof supportedDrivers[number];
export type ErrorReasons = keyof typeof errorReasons;

type ParserSuccessResult = {
  success: true;
  value: CacheInteropDsn;
};

export type ParserErrorResult = {
  success: false;
  reason: ErrorReasons;
  message: string;
};

export type ParserResult = ParserSuccessResult | ParserErrorResult;
