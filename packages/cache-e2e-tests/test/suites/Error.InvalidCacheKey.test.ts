import type { CacheInterface } from '@soluble/cache-interop';
import {
  InvalidCacheKeyException,
  CacheItem,
  Guards,
} from '@soluble/cache-interop';

import { getTestAdapters } from '../setup/getTestAdapters';

const adapters = getTestAdapters();

describe.each(adapters)('Adapter: %s', (name, adapterFactory) => {
  let cache: CacheInterface;
  beforeAll(async () => {
    cache = await adapterFactory();
  });
  afterEach(async () => {
    await cache.clear();
  });

  afterAll(async () => {
    if (Guards.isConnectedCache(cache)) {
      await cache.getConnection().quit();
    }
  });

  describe('When the cacheKey is invalid / unsupported format', () => {
    const invalidKey = { errKey: true } as unknown as string;
    describe('Adapter.delete(invalidKey)', () => {
      it('should return InvalidCacheKeyException', async () => {
        await expect(cache.delete(invalidKey)).resolves.toBeInstanceOf(
          InvalidCacheKeyException
        );
      });
    });

    describe('Adapter.set(invalidKey)', () => {
      it('should return InvalidCacheKeyException', async () => {
        await expect(cache.set(invalidKey, 'cool')).resolves.toBeInstanceOf(
          InvalidCacheKeyException
        );
      });
    });

    describe('Adapter.get(invalidKey)', () => {
      it('should return error with InvalidCacheKeyException', async () => {
        const item = await cache.get(invalidKey);
        expect(item).toBeInstanceOf(CacheItem);
        expect(item.error).toBeInstanceOf(InvalidCacheKeyException);
      });
    });

    describe('Adapter.getOrSet(invalidKey)', () => {
      it('should return InvalidCacheKeyException', async () => {
        const item = await cache.getOrSet(invalidKey, 'hello');
        expect(item).toBeInstanceOf(CacheItem);
        expect(item.error).toBeInstanceOf(InvalidCacheKeyException);
      });
    });

    describe('Adapter.has(invalidKey)', () => {
      it('should call onError and return an InvalidCacheKeyException', async () => {
        let error: Error | null = null;
        await cache.has(invalidKey, {
          onError: (err) => {
            error = err;
          },
        });
        expect(error).toBeInstanceOf(InvalidCacheKeyException);
      });
    });
  });
});
