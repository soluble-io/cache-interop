import { Guards } from '../guards';

describe('Guards tests', () => {
  describe('isValidCacheKey', () => {
    it('should work as expected', () => {
      expect(Guards.isValidCacheKey('k')).toStrictEqual(true);
      expect(Guards.isValidCacheKey('')).toStrictEqual(false);
      expect(Guards.isValidCacheKey(undefined)).toStrictEqual(false);
      expect(Guards.isValidCacheKey(1)).toStrictEqual(false);
    });
  });
});
