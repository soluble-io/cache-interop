import { RedisCacheAdapter } from '@soluble/cache-redis';
import { E2eDockerContainers } from './E2eDockerContainers';
import { IoRedisCacheAdapter } from '@soluble/cache-ioredis';
import { CacheInterface, MapCacheAdapter } from '@soluble/cache-interop';

/**
 * Return the configured adapters on which to run e2e tests
 */
export const getTestAdapters = () => {
  return [
    ['MapCacheAdapter', () => new MapCacheAdapter()],
    [
      'IoRedisCacheAdapter/Redis5',
      async () => {
        const { dsn } = await E2eDockerContainers.getContainer('redis5');
        return new IoRedisCacheAdapter({
          connection: dsn,
        });
      },
    ],
    [
      'IoRedisCacheAdapter/Redis6',
      async () => {
        const { dsn } = await E2eDockerContainers.getContainer('redis6');
        return new IoRedisCacheAdapter({
          connection: dsn,
        });
      },
    ],
    [
      'RedisCacheAdapter/Redis5',
      async () => {
        const { dsn } = await E2eDockerContainers.getContainer('redis5');
        return new RedisCacheAdapter({
          connection: dsn,
        });
      },
    ],
    [
      'RedisCacheAdapter/Redis6',
      async () => {
        const { dsn } = await E2eDockerContainers.getContainer('redis6');
        return new RedisCacheAdapter({
          connection: dsn,
        });
      },
    ],
  ] as [name: string, factory: () => CacheInterface | Promise<CacheInterface>][];
};
