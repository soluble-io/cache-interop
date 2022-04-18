import { CacheInterface, Guards } from '@soluble/cache-interop';

import { getTestAdapters } from '../setup/getTestAdapters';

const sleep = async (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

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

  describe('Adapter.get()', () => {
    describe('when value is not in cache', () => {
      it('should return empty non-error cacheitem', async () => {
        expect(await cache.get('k')).toMatchObject({
          isSuccess: true,
          isHit: false,
          error: undefined,
          data: null,
          metadata: {
            key: 'k',
          },
        });
      });
    });
    describe('when value is in cache', () => {
      it('should return cacheitem with data', async () => {
        await cache.set('k', 'hello');
        expect(await cache.get('k')).toMatchObject({
          isSuccess: true,
          isHit: true,
          data: 'hello',
        });
      });
    });
    describe('when a defaultValue is given', () => {
      it('should return defaultValue if nothing in cache', async () => {
        expect(await cache.get('k', { defaultValue: 'default' })).toMatchObject({
          isHit: false,
          data: 'default',
        });
      });
      it('should give priority to existing cache entry', async () => {
        await cache.set('k', 'initial');
        expect(await cache.get('k', { defaultValue: 'default' })).toMatchObject({
          isHit: true,
          data: 'initial',
        });
      });
    });
    describe('when an item was set with 0 expiry (forever)', () => {
      it('should always return a cache hit', async () => {
        await cache.set('k', 'hello world', { ttl: 0 });
        expect(await cache.get('k')).toMatchObject({
          isHit: true,
          data: 'hello world',
        });
      });
    });
    describe('when an item was set with 1 second expiry', () => {
      it('should always return a cache miss if a second has passed', async () => {
        await cache.set('k', 'hello world', { ttl: 1 });
        await sleep(1001);
        expect(await cache.get('k')).toMatchObject({
          isSuccess: true,
          isHit: false,
          data: null,
        });
      });
    });

    describe('when disableCache is true', () => {
      describe('when no defaultValue provided', () => {
        it('should never return the cache entry', async () => {
          await cache.set('k', 'cool');
          expect(
            await cache.get('k', {
              disableCache: true,
            })
          ).toMatchObject({
            isSuccess: true,
            isHit: false,
            data: null,
            error: undefined,
          });
        });
      });
      describe('when defaultValue value is provided', () => {
        it('should never return the default', async () => {
          await cache.set('k', 'cool');
          expect(
            await cache.get('k', {
              defaultValue: 'default',
              disableCache: true,
            })
          ).toMatchObject({
            isSuccess: true,
            isHit: false,
            data: 'default',
          });
        });
      });
    });
  });
});
