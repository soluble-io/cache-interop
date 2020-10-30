import { isNonEmptyString } from '../typeguards';

describe('Typeguards tests', () => {
  describe('isNonEmptyString', () => {
    it('should work as expected in when trim === true', () => {
      expect(isNonEmptyString('cool')).toBeTruthy();
      expect(isNonEmptyString(1)).toBeFalsy();
      expect(isNonEmptyString('  ')).toBeFalsy();
      expect(isNonEmptyString('')).toBeFalsy();
      expect(isNonEmptyString(null)).toBeFalsy();
      expect(isNonEmptyString({})).toBeFalsy();
    });
    it('should work as expected in when trim === false', () => {
      expect(isNonEmptyString('cool ', false)).toBeTruthy();
      expect(isNonEmptyString('  ', false)).toBeTruthy();
    });
  });
});
