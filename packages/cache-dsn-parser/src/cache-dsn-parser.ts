import queryString from 'query-string';

const supportedDrivers = ['redis'] as const;
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

export const parseDsn = (dsn: string): CacheInteropDsn | Error => {
  const matches = dsn.match(dsnRegexp);
  if (matches === null || !matches.groups) {
    return new Error('Cannot parse provided DSN');
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
  return (options as unknown) as CacheInteropDsn;
};
