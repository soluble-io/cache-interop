import { CacheException, InvalidCacheKeyException } from '../exceptions';
import { CacheItemFactory } from '../cache-item.factory';

describe('CacheItemFactory', () => {
  describe('fromOk', () => {
    it('should create a success item', () => {
      const item = CacheItemFactory.fromOk<string>({
        key: 'k',
        data: 'hello',
        isHit: true,
        isPersisted: false,
      });
      expect(item).toMatchObject({
        isSuccess: true,
        data: 'hello',
        isHit: true,
        isPersisted: false,
        metadata: {
          key: 'k',
        },
        error: undefined,
      });
    });
  });

  describe('fromInvalidCacheKey', () => {
    it('should create an error with invalid key', () => {
      const item = CacheItemFactory.fromInvalidCacheKey<string>(true);
      expect(item).toMatchObject({
        isSuccess: false,
        data: null,
        isHit: false,
        metadata: {
          key: 'InvalidArgument for cacheKey (true)',
        },
      });
      expect(item.error).toBeInstanceOf(InvalidCacheKeyException);
      expect(item.error?.message).toStrictEqual('InvalidArgument for cacheKey (true)');
    });

    it('should indicate default message', () => {
      const item = CacheItemFactory.fromInvalidCacheKey<string>(undefined);
      expect(item.error).toBeInstanceOf(InvalidCacheKeyException);
      expect(item.error?.message).toStrictEqual('InvalidArgument for cacheKey (undefined)');
    });
  });

  describe('fromErr', () => {
    it('should create an error item', () => {
      const item = CacheItemFactory.fromErr({
        key: 'k',
        error: new CacheException({ message: 'cool' }),
      });
      expect(item).toMatchObject({
        isSuccess: false,
        data: null,
        isHit: false,
        metadata: {
          key: 'k',
        },
      });
      expect(item.error).toBeInstanceOf(CacheException);
    });
  });
});
