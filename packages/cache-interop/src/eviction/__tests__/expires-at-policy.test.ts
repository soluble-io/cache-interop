import { InvalidArgumentException } from '../../exceptions';
import { ExpiresAtPolicy } from '../expires-at-policy';

describe('ExpiresAtPolicy::isExpired tests', () => {
  const policy = new ExpiresAtPolicy();
  describe('When expires_at param is 0', () => {
    it('should return false', () => {
      expect(policy.isExpired(0)).toStrictEqual(false);
    });
  });
  describe('When expires_at param is an unix time in the past', () => {
    it('should return true', () => {
      const expiresAt = Math.ceil(Date.now() / 1000) - 2;
      expect(policy.isExpired(expiresAt)).toStrictEqual(true);
    });
  });
  describe('When expires_at param is an unix time in the future', () => {
    it('should return false', () => {
      const expiresAt = Math.ceil(Date.now() / 1000) + 2;
      expect(policy.isExpired(expiresAt)).toStrictEqual(false);
    });
  });

  describe('When expires_at param is null', () => {
    it('should throw an InvalidArgumentException', () => {
      // @ts-expect-error
      expect(() => policy.isExpired(null)).toThrow(InvalidArgumentException);
    });
  });
});
