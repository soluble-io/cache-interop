import {
  InvalidArgumentException,
  InvalidCacheKeyException,
  UnsupportedFeatureException,
} from '../../exceptions';
import { Asserts } from '../asserts';

describe('Asserts tests', () => {
  describe('assertValidCacheKey', () => {
    it('should work as expected', () => {
      expect(Asserts.assertValidCacheKey('k')).toStrictEqual(undefined);
      expect(() => Asserts.assertValidCacheKey(null)).toThrow(/invalid/i);
      expect(() => Asserts.assertValidCacheKey(1)).toThrowError(
        InvalidArgumentException
      );
    });
  });
});
