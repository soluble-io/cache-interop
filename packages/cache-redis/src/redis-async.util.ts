import { promisify } from 'util';
import type { RedisClient } from 'redis';

export type AsyncRedisClient = ReturnType<typeof getAsyncRedisClient>;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getAsyncRedisClient = (redis: RedisClient) => {
  return {
    get: promisify(redis.get).bind(redis),
    set: promisify(redis.set).bind(redis),
    setex: promisify(redis.setex).bind(redis),
    exists: promisify(redis.exists).bind(redis) as (
      k: string
    ) => Promise<number>,
    del: promisify(redis.del).bind(redis) as (k: string) => Promise<number>,
    flushdb: promisify(redis.flushdb).bind(redis),
  };
};
