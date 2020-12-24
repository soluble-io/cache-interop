import queryString from 'query-string';
import { ErrorReasons, ParserErrorResult, ParserResult, SupportedDrivers } from './cache-dsn-parser.types';

export const supportedDrivers = ['redis', 'mysql', 'postgresql'] as const;

export const errorReasons = {
  EMPTY_DSN: 'DSN cannot be empty',
  INVALID_ARGUMENT: 'DSN must be a string',
  PARSE_ERROR: 'Cannot parse DSN',
} as const;

export type CacheInteropDsn = {
  driver: SupportedDrivers;
  user?: string;
  pass?: string;
  host: string;
  port?: number;
  db?: string;
  params?: Record<string, number | string | boolean>;
};

const dsnRegexp = new RegExp(
  `^(?<driver>(${supportedDrivers.join(
    '|'
  )})):\\/\\/((?<user>.+)?:(?<pass>.+)@)?(?<host>[^\\/:]+?)(:(?<port>\\d{2,5})?)?(\\/(?<db>\\w))?(\\?(?<params>.+))?$`
);

const createErrorResult = (reason: ErrorReasons): ParserErrorResult => {
  return {
    success: false,
    reason: reason,
    message: errorReasons[reason],
  };
};

export const parseDsn = (dsn: string): ParserResult => {
  if (typeof dsn !== 'string') {
    return createErrorResult('INVALID_ARGUMENT');
  }
  if (dsn.trim() === '') {
    return createErrorResult('EMPTY_DSN');
  }
  const matches = dsn.match(dsnRegexp);
  if (matches === null || !matches.groups) {
    return createErrorResult('PARSE_ERROR');
  }
  const options: Record<string, unknown> = {};
  Object.entries(matches.groups).forEach(([key, value]) => {
    if (typeof value === 'string') {
      switch (key) {
        case 'port':
          options['port'] = Number.parseInt(value, 10);
          break;
        case 'params':
          const parsed = queryString.parse(value, {
            parseBooleans: true,
            parseNumbers: true,
          });
          options['params'] = parsed;
          break;
        default:
          options[key] = value;
      }
    }
  });
  return {
    success: true,
    value: (options as unknown) as CacheInteropDsn,
  };
};
