import type { GetOrSetOptions } from '../../cache.interface';
import { getGetOrSetCacheDisabledParams } from '../cache-options-utils';

describe('getGetOrSetCacheActiveOptions', () => {
  describe('When disableCache is undefined', () => {
    it('should return read/write to false', () => {
      expect(getGetOrSetCacheDisabledParams(undefined)).toStrictEqual({
        read: false,
        write: false,
      });
    });
  });
  describe('When disableCache is false', () => {
    it('should return read/write to false', () => {
      expect(getGetOrSetCacheDisabledParams(false)).toStrictEqual({
        read: false,
        write: false,
      });
    });
  });
  describe('When disableCache is true', () => {
    it('should return read/write to false', () => {
      expect(getGetOrSetCacheDisabledParams(true)).toStrictEqual({
        read: true,
        write: true,
      });
    });
  });
  describe('When disableCache is an object with read/write', () => {
    it('should return the same object', () => {
      const opt: GetOrSetOptions['disableCache'] = {
        read: true,
        write: true,
      };
      expect(getGetOrSetCacheDisabledParams(opt)).toStrictEqual(opt);
    });
  });
});
