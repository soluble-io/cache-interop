import type { CacheInterface } from '@soluble/cache-interop';
import { Guards } from '@soluble/cache-interop';

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

  describe('Adapter.clear()', () => {
    describe('when no value in cache', () => {
      it('should return true', async () => {
        expect(await cache.clear()).toStrictEqual(true);
      });
    });
    describe('when some values are in cache', () => {
      it('should return true and delete the values', async () => {
        await cache.setMultiple([
          ['k1', 'val1'],
          ['k2', 'val2'],
        ]);
        expect((await cache.getMultiple(['k1', 'k2'])).size).toStrictEqual(2);
        expect(await cache.clear()).toStrictEqual(true);
        expect((await cache.get('k1')).data).toBeNull();
        expect((await cache.get('k2')).data).toBeNull();
      });
    });
  });
});
