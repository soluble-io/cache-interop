import { RedisClient } from 'redis';
import { promisify } from 'util';

export type AsyncRedisClient = ReturnType<typeof getAsyncRedisClient>;

export const getAsyncRedisClient = (redis: RedisClient) => {
  return {
    flushdb: promisify(redis.flushdb).bind(redis),
    set: promisify(redis.set).bind(redis),
    setex: promisify(redis.setex).bind(redis),
    exists: promisify(redis.exists).bind(redis) as (k: string) => Promise<number>,
    del: promisify(redis.del).bind(redis) as (k: string) => Promise<number>,
  };
};
