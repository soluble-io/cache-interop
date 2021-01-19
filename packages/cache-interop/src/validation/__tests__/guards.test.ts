import { Guards } from '../guards';
import { CacheInterface } from '../../cache.interface';
import { ConnectedCacheInterface } from '../../connection/connected-cache.interface';
import { CacheException, UnsupportedValueException } from '../../exceptions';

describe('Guards tests', () => {
  describe('isNonEmptyString', () => {
    it('should work as expected in when trim === true', () => {
      expect(Guards.isNonEmptyString('cool')).toBeTruthy();
      expect(Guards.isNonEmptyString(1)).toBeFalsy();
      expect(Guards.isNonEmptyString('  ')).toBeFalsy();
      expect(Guards.isNonEmptyString('')).toBeFalsy();
      expect(Guards.isNonEmptyString(null)).toBeFalsy();
      expect(Guards.isNonEmptyString({})).toBeFalsy();
    });
    it('should work as expected in when trim === false', () => {
      expect(Guards.isNonEmptyString('cool ', false)).toBeTruthy();
      expect(Guards.isNonEmptyString('  ', false)).toBeTruthy();
    });
  });

  describe('isValidRedisValue', () => {
    it('should work as expected', () => {
      expect(Guards.isValidRedisValue(1)).toStrictEqual(true);
      expect(Guards.isValidRedisValue(-3.2)).toStrictEqual(true);
      expect(Guards.isValidRedisValue('')).toStrictEqual(true);
      expect(Guards.isValidRedisValue('Hello')).toStrictEqual(true);
      expect(Guards.isValidRedisValue(() => {})).toStrictEqual(false);
      expect(Guards.isValidRedisValue(NaN)).toStrictEqual(false);
      expect(Guards.isValidRedisValue(new Date())).toStrictEqual(false);
      expect(Guards.isValidRedisValue(/.*/)).toStrictEqual(false);
    });
  });

  describe('isCacheException', () => {
    it('should work as expected', () => {
      expect(Guards.isCacheException(new CacheException({ message: 't' }))).toStrictEqual(true);
      expect(Guards.isCacheException(new UnsupportedValueException({ message: 't' }))).toStrictEqual(true);
      expect(Guards.isCacheException(() => {})).toStrictEqual(false);
      expect(Guards.isCacheException(NaN)).toStrictEqual(false);
      expect(Guards.isCacheException(new Date())).toStrictEqual(false);
      expect(Guards.isCacheException(/.*/)).toStrictEqual(false);
    });
  });

  describe('isCacheValueProviderFn', () => {
    it('should work as expected', () => {
      expect(Guards.isCacheValueProviderFn(() => {})).toStrictEqual(true);
      expect(Guards.isCacheValueProviderFn(async () => {})).toStrictEqual(true);
      expect(Guards.isCacheValueProviderFn(null)).toStrictEqual(false);
      expect(Guards.isCacheValueProviderFn(new Promise(() => {}))).toStrictEqual(true);
    });
  });
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
