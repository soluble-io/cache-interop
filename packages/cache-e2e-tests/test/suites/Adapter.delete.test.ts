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

  describe('Adapter.delete()', () => {
    describe('when value is not in cache', () => {
      it('should return false', async () => {
        expect(await cache.delete('no_existing')).toStrictEqual(false);
      });
    });
    describe('when value is in cache', () => {
      it('should return true and delete the entry', async () => {
        await cache.set('k', 'cool');
        expect((await cache.get('k')).data).toStrictEqual('cool');
        expect(await cache.delete('k')).toStrictEqual(true);
        expect((await cache.get('k')).data).toStrictEqual(null);
      });
    });
    describe('when disableCache is set to true', () => {
      describe('when an item exists', () => {
        it('should no delete it and return false', async () => {
          await cache.set('k', 'hello');
          const ret = await cache.delete('k', {
            disableCache: true,
          });
          expect(ret).toStrictEqual(false);
          expect((await cache.get('k')).data).toStrictEqual('hello');
        });
        describe('when no item exists', () => {
          it('should return false', async () => {
            const ret = await cache.delete('k', {
              disableCache: true,
            });
            expect(ret).toStrictEqual(false);
          });
        });
      });
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
