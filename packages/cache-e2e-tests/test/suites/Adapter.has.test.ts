import type { CacheInterface } from '@soluble/cache-interop';
import { Guards } from '@soluble/cache-interop';
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

  describe('Adapter.has()', () => {
    describe('when value is not in cache', () => {
      it('should return false', async () => {
        expect(await cache.has('not_exist')).toStrictEqual(false);
      });
    });
    describe('when value is in cache', () => {
      it('should return true', async () => {
        await cache.set('k', 'cool');
        expect(await cache.has('k')).toStrictEqual(true);
      });
    });
    describe('when an item was set with 0 expiry (forever)', () => {
      it('should always return true', async () => {
        await cache.set('k', 'hello world', { ttl: 0 });
        expect(await cache.has('k')).toStrictEqual(true);
      });
    });
    describe('when an item was set with 1 second expiry', () => {
      it('should return false if a second has passed', async () => {
        await cache.set('k', 'hello world', { ttl: 1 });
        await sleep(1_005);
        expect(await cache.has('k')).toStrictEqual(false);
      });
    });
    describe('when disableCache is set to true', () => {
      it('should always return false whether the item exists or not', async () => {
        expect(
          await cache.has('k', {
            disableCache: true,
          })
        ).toStrictEqual(false);
        await cache.set('k', 'hello world');
        expect(
          await cache.has('k', {
            disableCache: true,
          })
        ).toStrictEqual(false);
      });
    });
  });
});
