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
 *
 * @param dsn - Parsable DSN, i.e: redis://localhost:6379/db1
 * @param clientOptions - node redis client options object
 *
 * @link https://github.com/soluble-io/cache-interop/tree/main/packages/dsn-parser
 * @link https://github.com/NodeRedis/node-redis#options-object-properties
 *
 * @throws Error if dsn is invalid or cannot be parsed
 */
export const getRedisOptionsFromDsn = (
  dsn: string,
  clientOptions?: Partial<Omit<RedisClientOptions, 'url'>> & { url?: never },
  dsnOverrides?: ParseDsnOptions['overrides']
): RedisClientOptions => {
  const parsed = parseDsn(dsn, {
    lowercaseDriver: true,
    overrides: dsnOverrides || {},
  });
  if (!parsed.success) {
    throw new Error(`Can't parse DSN, reason ${parsed.reason}`);
  }
  const { driver, host, port, user, pass, db } = { ...parsed.value, ...(dsnOverrides ?? {}) };

  if (!['redis', 'rediss'].includes(driver)) {
    throw new Error(`Unsupported driver '${driver}', must be redis or rediss`);
  }

  const tlsOptions = getTlsOptions(driver, host);

  return {
    ...{
      host,
      ...(port !== undefined ? { port: port } : {}),
      ...(user !== undefined ? { username: user } : {}),
      ...(pass !== undefined ? { auth_pass: pass } : {}),
      ...(tlsOptions !== null ? { tls: tlsOptions } : {}),
      ...(db !== undefined ? { db } : {}),
    },
    ...(clientOptions ?? {}),
  };
};
