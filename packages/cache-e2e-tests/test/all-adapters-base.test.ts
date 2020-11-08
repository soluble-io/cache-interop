import { CacheException, CacheInterface, IoRedisCacheAdapter, MapCacheAdapter } from '@soluble/cache-interop';

const adapters = [
  ['MapCacheAdapter', () => new MapCacheAdapter()],
  ['MapCacheAdapter2', () => new MapCacheAdapter()],
  //['IoRedisCacheAdapter', () => IoRedisCacheAdapter.createFromDSN()],
] as [string, () => CacheInterface][];

describe.each(adapters)('Adapter: %s', (name, adapterFactory) => {
  let cache: CacheInterface = adapterFactory();

  afterEach(() => {
    cache.clear();
    cache = adapterFactory();
  });

  describe('Adapter.set()', () => {
    describe('when value is a string', () => {
      it('should return true', async () => {
        expect(await cache.set('k', 'cool')).toStrictEqual(true);
      });
    });
    describe('when value is null', () => {
      it('should return true', async () => {
        expect(await cache.set('k', null)).toStrictEqual(true);
      });
    });
    describe('when value is a regular function', () => {
      it('should call the function and return true', async () => {
        const fct = jest.fn((_) => 'cool');
        expect(await cache.set('k', fct)).toStrictEqual(true);
        expect(fct).toHaveBeenCalledTimes(1);
      });
    });
    describe('when value is a native async function', () => {
      it('should call the function with params and return true', async () => {
        const fct = jest.fn(async (_) => 'native');
        expect(await cache.set('k', fct)).toStrictEqual(true);
        expect(fct).toHaveBeenCalledTimes(1);
      });
      it('should return a CacheException when promise fails', async () => {
        const fct = jest.fn(async (_) => {
          throw new Error('fetch-error');
        });
        const ret = await cache.set('k', fct);
        expect(ret).toBeInstanceOf(CacheException);
        expect(fct).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Adapter.get()', () => {
    describe('when value is not in cache', () => {
      it('should return empty non-error cacheitem', async () => {
        expect(await cache.get('k')).toMatchObject({
          key: 'k',
          hit: false,
          error: false,
          value: null,
        });
      });
    });
    describe('when value is in cache', () => {
      it('should return cacheitem with data', async () => {
        await cache.set('k', 'hello world');
        expect(await cache.get('k')).toMatchObject({
          key: 'k',
          hit: true,
          error: false,
          value: 'hello world',
        });
      });
    });
  });

  describe('Adapter::getOrSet', () => {
    describe('when value is not in cache', () => {
      it('should return and set the value', async () => {
        expect(await cache.getOrSet('k', async () => 'hello')).toMatchObject({
          key: 'k',
          hit: true,
          error: false,
          value: 'hello',
        });
      });
    });
  });
});
