import { createRedisConnection } from '../redis-connection.factory';

describe('ioredis-connection.factory', () => {
  describe('createIORedisConnection', () => {
    describe('when dsn is invalid', () => {
      it('should throw a parse error', () => {
        expect(() => createRedisConnection('invalid:/')).toThrow("Can't parse DSN, reason PARSE_ERROR");
      });
    });
    describe('when dsn is valid', () => {
      it('should create a lazy connection', async () => {
        const conn = createRedisConnection('redis://localhost:65534');
        const status = conn.connected;
        await conn.quit();
        expect(status).toStrictEqual(false);
      });
    });
  });
});
