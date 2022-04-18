import IORedis from 'ioredis';
import type { Redis, RedisOptions } from 'ioredis';
import { IoredisConnection } from './ioredis-connection';
import { getIoRedisOptionsFromDsn } from './ioredis-dsn.util';

export const isNativeIORedis = (val: unknown): val is Redis => {
  return typeof (val as Redis)?.connect === 'function';
};

/**
 * @throws Error
 */
export const createIoRedisNativeConnection = (
  options: RedisOptions | string
): Redis => {
  const opts =
    typeof options === 'string' ? getIoRedisOptionsFromDsn(options) : options;
  if (!opts) {
    throw new Error('Invalid ioredis connection options');
  }
  return new IORedis(opts);
};

/**
 * @throws Error
 */
export const createIoRedisConnection = (
  conn: RedisOptions | string | Redis
): IoredisConnection => {
  if (isNativeIORedis(conn)) {
    return new IoredisConnection(conn);
  }
  return new IoredisConnection(createIoRedisNativeConnection(conn));
};
