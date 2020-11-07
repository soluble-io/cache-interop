import { MapCacheAdapter } from '../map-cache-adapter';
import { CacheException } from '../../exceptions';

describe('MapCacheAdapter.set()', () => {
  describe('when value is a string', () => {
    it('should return true', async () => {
      expect(await new MapCacheAdapter().set('k', 'cool')).toStrictEqual(true);
    });
  });
  describe('when value is null', () => {
    it('should return true', async () => {
      expect(await new MapCacheAdapter().set('k', null)).toStrictEqual(true);
    });
  });
  describe('when value is a regular function', () => {
    it('should call the function and return true', async () => {
      const fct = jest.fn((_) => 'cool');
      expect(await new MapCacheAdapter().set('k', fct)).toStrictEqual(true);
      expect(fct).toHaveBeenCalledTimes(1);
    });
  });
  describe('when value is a native async function', () => {
    it('should call the function with params and return true', async () => {
      const fct = jest.fn(async (_) => 'native');
      expect(await new MapCacheAdapter().set('k', fct)).toStrictEqual(true);
      expect(fct).toHaveBeenCalledTimes(1);
    });
    it('should return a CacheException when promise fails', async () => {
      const fct = jest.fn(async (_) => {
        throw new Error('fetch-error');
      });
      const ret = await new MapCacheAdapter().set('k', fct);
      expect(ret).toBeInstanceOf(CacheException);
      expect(fct).toHaveBeenCalledTimes(1);
    });
  });
});

describe('MapCacheAdapter.get()', () => {
  describe('when value is not in cache', () => {
    it('should return empty non-error cacheitem', async () => {
      const cache = new MapCacheAdapter();
      expect(await cache.get('k')).toMatchObject({
        key: 'k',
        hit: false,
        error: false,
        data: null,
      });
      cache.clear();
    });
  });
  describe('when value is in cache', () => {
    it('should return cacheitem with data', async () => {
      const cache = new MapCacheAdapter();
      await cache.set('k', 'set');
      expect(await cache.get('k')).toMatchObject({
        key: 'k',
        hit: true,
        error: false,
        data: 'hello world',
      });
      cache.clear();
    });
  });
});
