import IORedis from 'ioredis';
import { getIoRedisOptionsFromDsn } from './ioredis-dsn.util';

export const createIORedisConnection = (options: IORedis.RedisOptions | string): IORedis.Redis => {
  const opts = typeof options === 'string' ? getIoRedisOptionsFromDsn(options) : options;
  return new IORedis(opts);
};
