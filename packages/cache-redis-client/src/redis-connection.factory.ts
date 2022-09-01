import type { RedisClientOptions, RedisClientType } from '@redis/client';
import { createClient } from '@redis/client';
import RedisClient from '@redis/client/dist/lib/client';
import { RedisConnection } from './redis-connection';
import { getRedisOptionsFromDsn } from './redis-dsn.util';

const isNativeRedisClient = (val: unknown): val is RedisClientType => {
  return val instanceof RedisClient;
};

export const createRedisNativeConnection = (
  options: RedisClientOptions | string
) => {
  const opts =
    typeof options === 'string' ? getRedisOptionsFromDsn(options) : options;
  if (!opts) {
    throw new Error('Invalid redis connection options');
  }
  return createClient(opts);
};

export const createRedisConnection = (
  conn: string | RedisClientOptions
): RedisConnection => {
  if (isNativeRedisClient(conn)) {
    return new RedisConnection(conn);
  }
  return new RedisConnection(createRedisNativeConnection(conn as any) as any);
};
