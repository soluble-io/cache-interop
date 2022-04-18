import { InvalidCacheKeyException } from '../../exceptions';
import { MapCacheAdapter } from '../map-cache-adapter';

describe('MapCacheAdapter tests', () => {
  describe('When cache key is invalid', () => {
    const cache = new MapCacheAdapter();
    const key = { errKey: true } as unknown as string;
    it('should return InvalidCacheKeyException for simple operations', async () => {
      await expect(cache.delete(key)).resolves.toBeInstanceOf(
        InvalidCacheKeyException
      );
      await expect(cache.set(key, 'cool')).resolves.toBeInstanceOf(
        InvalidCacheKeyException
      );
      await expect(cache.delete(key)).resolves.toBeInstanceOf(
        InvalidCacheKeyException
      );
    });
  });
});
