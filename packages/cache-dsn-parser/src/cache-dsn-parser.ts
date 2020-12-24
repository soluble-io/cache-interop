import queryString from 'query-string';

const supportedDrivers = ['redis', 'mysql', 'postgresql'] as const;
type SupportedDrivers = typeof supportedDrivers[number];

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

type Result =
  | {
      success: true;
      value: CacheInteropDsn;
    }
  | {
      success: false;
      reason: 'EMPTY_DSN' | 'INVALID_ARGUMENT' | 'PARSE_ERROR';
      message: string;
    };

export const parseDsn = (dsn: string): Result => {
  if (typeof dsn !== 'string') {
    return {
      success: false,
      reason: 'INVALID_ARGUMENT',
      message: 'DSN must be a string',
    };
  }
  if (dsn.trim() === '') {
    return {
      success: false,
      reason: 'EMPTY_DSN',
      message: 'DSN cannot be empty',
    };
  }
  const matches = dsn.match(dsnRegexp);
  if (matches === null || !matches.groups) {
    return { success: false, reason: 'PARSE_ERROR', message: 'Cannot parse DSN' };
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
