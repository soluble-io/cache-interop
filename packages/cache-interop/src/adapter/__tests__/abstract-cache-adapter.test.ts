import { MapCacheAdapter } from '../map-cache-adapter';

describe('AbstractCacheAdapter::getOrSet', () => {
  describe('when value is not in cache', () => {
    it('should return and set the value', async () => {
      const cache = new MapCacheAdapter();
      expect(await cache.getOrSet('k', async () => 'hello')).toMatchObject({
        key: 'k',
        hit: true,
        error: false,
        value: 'hello',
      });
      cache.clear();
    });
  });
});
