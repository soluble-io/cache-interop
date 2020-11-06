import { CacheExpiry } from '../cache-expiry';
import { ConstantDateProvider } from '../../../test/utils/constant-date-provider';

describe('CacheExpiry.getExpiresAt()', () => {
  const date = new Date();
  const timeInSecs = Math.floor(date.getTime() / 1000);
  const expiry = new CacheExpiry({
    dateProvider: new ConstantDateProvider(date),
  });
  describe('when a positive ttl is given', () => {
    it('should add the ttl to expiresAt', () => {
      expect(expiry.getExpiresAt(10)).toEqual(timeInSecs + 10);
    });
  });
  describe('when a negative ttl is given', () => {
    it('should subtract the ttl from expiresAt', () => {
      expect(expiry.getExpiresAt(-10)).toEqual(timeInSecs - 10);
    });
  });
  describe('when a zero ttl is given', () => {
    it('should return return the expiry as null', () => {
      expect(expiry.getExpiresAt(0)).toBeNull();
    });
  });
});
