import { parseDsn, ParseDsnOptions } from '@soluble/dsn-parser';
import IORedis from 'ioredis';
import type { ConnectionOptions } from 'tls';
import { ClientOpts as RedisClientOptions } from 'redis';

export const getDbIndex = (db: number | string | undefined): number | null => {
  if (typeof db === 'undefined') {
    return null;
  }
  if (typeof db === 'number') {
    return db;
  }
  const dbIdx = Number.parseInt(db.replace(/^db(\d){1,5}$/, '$1'), 10);
  if (Number.isSafeInteger(dbIdx)) {
    return dbIdx;
  }
  return null;
};

export const getTlsOptions = (driver: string, host: string): ConnectionOptions | null => {
  if (driver !== 'rediss') {
    return null;
  }
  const tldHostname = /\.[a-z]{1,10}$/i.test(host);
  return {
    ...(tldHostname ? { host } : {}),
  };
};

type IORedisOptions = IORedis.RedisOptions;

/**
 * Converts a soluble/dsn-parser dsn into compatible IORedis.Options
 * @link https://github.com/soluble-io/cache-interop/tree/main/packages/dsn-parser
 *
 * @throws Error id dsn is invalid or cannot be parsed
 */
export const getIoRedisOptionsFromDsn = (
  dsn: string,
  clientOptions?: Partial<IORedisOptions>,
  dsnOverrides?: ParseDsnOptions['overrides']
): IORedis.RedisOptions => {
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
  const dbIndex = getDbIndex(db);

  return {
    ...{
      host,
      ...(port !== undefined ? { port: port } : {}),
      ...(user !== undefined ? { username: user } : {}),
      ...(pass !== undefined ? { password: pass } : {}),
      ...(tlsOptions !== null ? { tls: tlsOptions } : {}),
      ...(dbIndex !== null ? { db: dbIndex } : {}),
    },
    ...(clientOptions ?? {}),
  };
};
