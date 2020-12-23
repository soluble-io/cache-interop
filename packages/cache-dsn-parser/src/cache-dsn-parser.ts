const supportedDrivers = ['redis'] as const;
type SupportedDrivers = typeof supportedDrivers[number];

export type CacheInteropDsn = {
  driver: SupportedDrivers;
  user?: string;
  pass?: string;
  host: string;
  port?: number;
  db?: number;
  params?: Record<string, number | string>;
};

const dsnRegexp = new RegExp(
  `^(?<driver>(${supportedDrivers.join(
    '|'
  )})):\\/\\/((?<user>.+)?:(?<pass>.+)@)?(?<host>[^\\/:]+?)(:(?<port>\\d{2,5})?)?(\\/(?<db>\\d))?$`
);

export const parseDsn = (dsn: string): CacheInteropDsn | Error => {
  const matches = dsn.match(dsnRegexp);
  if (matches === null || !matches.groups) {
    return new Error('Cannot parse provided DSN');
  }
  const options: Record<string, number | string> = {};
  for (const [key, value] of Object.entries(matches.groups)) {
    if (typeof value === 'string') {
      switch (key) {
        case 'port':
          options[key] = Number.parseInt(value, 10);
          break;
        default:
          options[key] = value;
      }
    }
  }
  return (options as unknown) as CacheInteropDsn;
};
