import { RedisClient, createClient, ClientOpts as RedisClientOptions } from 'redis';
import { getRedisOptionsFromDsn } from './redis-dsn.util';

export const createRedisConnection = (options: RedisClientOptions | string): RedisClient => {
  const opts = typeof options === 'string' ? getRedisOptionsFromDsn(options) : options;
  return createClient(opts);
};
