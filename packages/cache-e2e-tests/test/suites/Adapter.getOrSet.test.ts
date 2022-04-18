import { CacheInterface, Guards } from '@soluble/cache-interop';
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

  describe('Adapter.getOrSet()', () => {
    describe('when key is not in cache', () => {
      it('should execute the function and persist its return value', async () => {
        const fct = jest.fn(async (_) => 'hello');
        expect(await cache.getOrSet('k', fct)).toMatchObject({
          isSuccess: true,
          isHit: false,
          isPersisted: true,
          data: 'hello',
          error: undefined,
          metadata: {
            key: 'k',
          },
        });
        expect(fct).toHaveBeenCalledTimes(1);
        expect((await cache.get('k')).data).toStrictEqual('hello');
      });
    });
    describe('when key is already in cache', () => {
      it('should not execute the function provider and return the entry', async () => {
        const fct = jest.fn(async (_) => 'value_from_promise');
        await cache.set('k', 'initial_value');
        expect(await cache.getOrSet('k', fct)).toMatchObject({
          isHit: true,
          isPersisted: null,
          data: 'initial_value',
        });
        expect(fct).toHaveBeenCalledTimes(0);
      });
    });

    describe('when disableCache is set to true (read/write)', () => {
      describe('when a cache entry exists', () => {
        it('should execute the fn but ignore cache in read / write', async () => {
          const fct = jest.fn(async (_) => 'from_promise');
          await cache.set('k', 'initial_value');
          expect(
            await cache.getOrSet('k', fct, {
              disableCache: true,
            })
          ).toMatchObject({
            isSuccess: true,
            isHit: false,
            isPersisted: false,
            data: 'from_promise',
            error: undefined,
          });
          expect(fct).toHaveBeenCalledTimes(1);
          expect((await cache.get('k')).data).toStrictEqual('initial_value');
        });
      });
    });
  });
});
