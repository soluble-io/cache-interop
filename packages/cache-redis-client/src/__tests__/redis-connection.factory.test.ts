import { createRedisNativeConnection } from '../redis-connection.factory';

describe('ioredis-connection.factory', () => {
  describe('createIORedisConnection', () => {
    describe('when dsn is invalid', () => {
      it('should throw a parse error', () => {
        expect(() => createRedisNativeConnection('invalid:/')).toThrow(
          "Can't parse DSN, reason PARSE_ERROR"
        );
      });
    });
    describe('when dsn is valid', () => {
      it('should create a lazy connection', async () => {
        const conn = createRedisNativeConnection('redis://localhost:65534');
        // @todo we might want to create connection
        expect(conn.isOpen).toBeFalsy();
        await conn.connect();
        expect(conn.isOpen).toBeTruthy();
        await conn.quit();
        expect(conn.isOpen).toBeFalsy();
      });
    });
  });
});
