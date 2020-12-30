import { RedisCacheAdapter } from '../redis-cache-adapter';

describe('RedisCacheAdapter', () => {
  describe('constructor', () => {
    describe('when dsn is invalid', () => {
      it('should throw a parse error', () => {
        expect(
          () =>
            new RedisCacheAdapter({
              connection: 'ff',
            })
        ).toThrow("Can't parse DSN, reason PARSE_ERROR");
      });
    });
    describe('when dsn is an invalid type', () => {
      it('should throw a parse error', () => {
        expect(
          () =>
            new RedisCacheAdapter({
              connection: (null as unknown) as string,
            })
        ).toThrow('Invalid redis connection options');
      });
    });
  });
});
