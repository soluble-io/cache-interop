import type { RedisClientOptions } from '@redis/client';
import type { ParseDsnOptions } from '@soluble/dsn-parser';
import { parseDsn } from '@soluble/dsn-parser';

export const getDbIndex = (db: number | string | undefined): number | null => {
  if (db === undefined) {
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
  // eslint-disable-next-line sonarjs/cognitive-complexity
): RedisClientOptions => {
  const parsed = parseDsn(dsn, {
    lowercaseDriver: true,
    overrides: dsnOverrides || {},
  });
  if (!parsed.success) {
    throw new Error(`Can't parse DSN, reason ${parsed.reason}`);
  }
  const { driver, host, port, user, pass, db } = {
    ...parsed.value,
    ...(dsnOverrides ?? {}),
  };

  if (!['redis', 'rediss'].includes(driver)) {
    throw new Error(`Unsupported driver '${driver}', must be redis or rediss`);
  }

  const dbIndex = getDbIndex(db) ?? undefined;
  const { socket, ...restClientOptions } = clientOptions ?? {};
  const isTls = driver === 'rediss';

  const socketOptions: RedisClientOptions['socket'] = {
    ...(host !== undefined ? { host: host } : {}),
    ...(port !== undefined ? { port: port } : {}),
    ...(isTls ? { tls: true } : {}),
    ...socket,
  };

  return {
    socket: socketOptions,
    ...(user !== undefined ? { username: user } : {}),
    ...(pass !== undefined ? { password: pass } : {}),
    ...(dbIndex !== undefined ? { database: dbIndex } : {}),
    ...(restClientOptions ?? {}),
  };
};
