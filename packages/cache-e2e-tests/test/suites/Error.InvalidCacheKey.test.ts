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
  afterAll(async () => {
    if (Guards.isConnectedCache(cache)) {
      await cache.getConnection().quit();
    }
  });
  afterEach(async () => {
    await cache.clear();
  });

  describe('When the cacheKey is invalid / unsupported format', () => {
    const invalidKey = { errKey: true } as unknown as string;
    test('calling delete(invalidKey) should return InvalidCacheKeyException', async () => {
      await expect(cache.delete(invalidKey)).resolves.toBeInstanceOf(
        InvalidCacheKeyException
      );
    });
    test('calling set(invalidKey) should return InvalidCacheKeyException', async () => {
      await expect(cache.set(invalidKey, 'cool')).resolves.toBeInstanceOf(
        InvalidCacheKeyException
      );
    });
    test('calling get(invalidKey) should return error with InvalidCacheKeyException', async () => {
      const item = await cache.get(invalidKey);
      expect(item).toBeInstanceOf(CacheItem);
      expect(item.error).toBeInstanceOf(InvalidCacheKeyException);
    });
    test('calling getOrSet(invalidKey) should return InvalidCacheKeyException', async () => {
      const item = await cache.getOrSet(invalidKey, 'hello');
      expect(item).toBeInstanceOf(CacheItem);
      expect(item.error).toBeInstanceOf(InvalidCacheKeyException);
    });
    test('calling has(invalidKey, { onError }) should call onError and return an InvalidCacheKeyException', async () => {
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
