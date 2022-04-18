import { IoRedisCacheAdapter } from '../ioredis-cache-adapter';

describe('IoRedisCacheAdapter', () => {
  describe('constructor', () => {
    describe('when dsn is invalid', () => {
      it('should throw a parse error', () => {
        expect(
          () =>
            new IoRedisCacheAdapter({
              connection: 'ff',
            })
        ).toThrow("Can't parse DSN, reason PARSE_ERROR");
      });
    });
    describe('when dsn is an invalid type', () => {
      it('should throw a parse error', () => {
        expect(
          () =>
            new IoRedisCacheAdapter({
              connection: null as unknown as string,
            })
        ).toThrow('Invalid ioredis connection options');
      });
    });
  });
});
