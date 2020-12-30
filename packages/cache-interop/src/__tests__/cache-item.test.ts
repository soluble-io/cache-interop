import { CacheItem } from '../cache-item';
import { CacheException } from '../exceptions';

describe('CacheItem', () => {
  describe('Constructor', () => {
    it('should set ok values', () => {
      const item = new CacheItem<string>({
        success: true,
        isHit: true,
        data: 'hello',
        key: 'k',
      });
      expect(item).toMatchObject({
        data: 'hello',
        error: undefined,
        isSuccess: true,
        isPersisted: null,
        isHit: true,
        metadata: {
          key: 'k',
        },
      });
    });

    it('should set persisted', () => {
      const item = new CacheItem<string>({
        success: true,
        isHit: false,
        data: 'hello',
        key: 'k',
        isPersisted: true,
      });
      expect(item).toMatchObject({
        data: 'hello',
        error: undefined,
        isSuccess: true,
        isPersisted: true,
        isHit: false,
        metadata: {
          key: 'k',
        },
      });
    });

    it('should set err values', () => {
      const item = new CacheItem<string>({
        success: false,
        key: 'k',
        error: new CacheException({
          message: 'Test',
        }),
      });
      expect(item).toMatchObject({
        data: null,
        isSuccess: false,
        isHit: false,
        isPersisted: null,
        metadata: {
          key: 'k',
        },
      });
      expect(item.error).toBeInstanceOf(CacheException);
    });
  });
});
