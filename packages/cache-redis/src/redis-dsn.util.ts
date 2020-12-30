import { parseDsn, ParseDsnOptions } from '@soluble/dsn-parser';
import type { ConnectionOptions } from 'tls';
import { ClientOpts as RedisClientOptions } from 'redis';

export const getTlsOptions = (driver: string, host: string): ConnectionOptions | null => {
  if (driver !== 'rediss') {
    return null;
  }
  const tldHostname = /\.[a-z]{1,10}$/i.test(host);
  return {
    ...(tldHostname ? { host } : {}),
  };
};

/**
 * Converts a soluble/dsn-parser dsn into Redis.Options
 * @link https://github.com/soluble-io/cache-interop/tree/main/packages/dsn-parser
 *
 * @throws Error id dsn is invalid or cannot be parsed
 */
export const getRedisOptionsFromDsn = (dsn: string, overrides?: ParseDsnOptions['overrides']): RedisClientOptions => {
  const parsed = parseDsn(dsn, {
    lowercaseDriver: true,
    overrides: overrides || {},
  });
  if (!parsed.success) {
    throw new Error(`Can't parse DSN, reason ${parsed.reason}`);
  }
  const { driver, host, port, user, pass, db } = { ...parsed.value, ...(overrides ?? {}) };

  if (!['redis', 'rediss'].includes(driver)) {
    throw new Error(`Unsupported driver '${driver}', must be redis or rediss`);
  }

  const tlsOptions = getTlsOptions(driver, host);

  return {
    host,
    ...(port !== undefined ? { port: port } : {}),
    ...(user !== undefined ? { username: user } : {}),
    ...(pass !== undefined ? { auth_pass: pass } : {}),
    ...(tlsOptions !== null ? { tls: tlsOptions } : {}),
    ...(db !== undefined ? { db } : {}),
  };
};
