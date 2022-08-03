import type { ClientOpts as RedisClientOptions } from 'redis';
import { RedisClient, createClient } from 'redis';
import { RedisConnection } from './redis-connection';
import { getRedisOptionsFromDsn } from './redis-dsn.util';

const isNativeRedisClient = (val: unknown): val is RedisClient => {
  return val instanceof RedisClient;
};

export const createRedisNativeConnection = (
  options: RedisClientOptions | string
): RedisClient => {
  const opts =
    typeof options === 'string' ? getRedisOptionsFromDsn(options) : options;
  if (!opts) {
    throw new Error('Invalid redis connection options');
  }
  return createClient(opts);
};

export const createRedisConnection = (
  conn: string | RedisClientOptions | RedisClient
): RedisConnection => {
  if (isNativeRedisClient(conn)) {
    return new RedisConnection(conn);
  }
  return new RedisConnection(createRedisNativeConnection(conn));
};
