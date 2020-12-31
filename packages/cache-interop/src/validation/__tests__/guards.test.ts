import { Guards } from '../guards';
import { CacheInterface } from '../../cache.interface';
import { ConnectedCacheInterface } from '../../connection/connected-cache.interface';

describe('Guards tests', () => {
  describe('isConnectedCacheInterface', () => {
    describe('when a CacheInterface is given', () => {
      it('should return false', () => {
        const object = {} as CacheInterface<unknown>;
        expect(Guards.isConnectedCache(object)).toStrictEqual(false);
      });
    });
    describe('when a ConnectedCacheInterface is given', () => {
      it('should return true', () => {
        const object = {
          getConnection: () => {},
        } as ConnectedCacheInterface<unknown>;
        expect(Guards.isConnectedCache(object)).toStrictEqual(true);
      });
    });

    describe('when unsupported types are given', () => {
      it('should not throw and return false', () => {
        expect(Guards.isConnectedCache(null as any)).toStrictEqual(false);
        expect(Guards.isConnectedCache(undefined as any)).toStrictEqual(false);
      });
    });
  });

  describe('isValidCacheKey', () => {
    it('should work as expected', () => {
      expect(Guards.isValidCacheKey('k')).toStrictEqual(true);
      expect(Guards.isValidCacheKey('')).toStrictEqual(false);
      expect(Guards.isValidCacheKey(undefined)).toStrictEqual(false);
      expect(Guards.isValidCacheKey(1)).toStrictEqual(false);
    });
  });
});
