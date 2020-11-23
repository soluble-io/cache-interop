import { isNonEmptyString, isSafeInteger } from '../typeguards';

describe('Typeguards tests', () => {
  describe('isSafeInteger', () => {
    it('should work as expected', () => {
      expect(isSafeInteger(10)).toBeTruthy();
      expect(isSafeInteger(0)).toBeTruthy();
      expect(isSafeInteger(-3)).toBeTruthy();
      expect(isSafeInteger(2.12)).toBeFalsy();
      expect(isSafeInteger('10')).toBeFalsy();
      expect(isSafeInteger(NaN)).toBeFalsy();
      expect(isSafeInteger(undefined)).toBeFalsy();
      expect(isSafeInteger(null)).toBeFalsy();
      expect(isSafeInteger(false)).toBeFalsy();
      expect(isSafeInteger({})).toBeFalsy();
      expect(isSafeInteger([])).toBeFalsy();
      expect(isSafeInteger(new Date())).toBeFalsy();
    });
  });

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
