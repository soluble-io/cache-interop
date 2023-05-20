import type { CacheInterface } from '@soluble/cache-interop';
import { MapCacheAdapter } from '@soluble/cache-interop';
import { IoRedisCacheAdapter } from '@soluble/cache-ioredis';
import { RedisCacheAdapter } from '@soluble/cache-redis';
import { E2eDockerContainers } from './E2eDockerContainers';

/**
 * Return the configured adapters on which to run e2e tests
 */
export const getTestAdapters = () => {
  return [
    ['MapCacheAdapter', () => new MapCacheAdapter()],
    [
      'IoRedisCacheAdapter/Redis7',
      async () => {
        const { dsn } = await E2eDockerContainers.getContainer('redis7');
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
      'RedisCacheAdapter/Redis7',
      async () => {
        const { dsn } = await E2eDockerContainers.getContainer('redis7');
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
    [
      'RedisCacheAdapter/DragonflyLatest',
      async () => {
        const { dsn } = await E2eDockerContainers.getContainer(
          'dragonflyLatest'
        );
        return new RedisCacheAdapter({
          connection: dsn,
        });
      },
    ],
  ] as [
    name: string,
    factory: () => CacheInterface | Promise<CacheInterface>
  ][];
};
