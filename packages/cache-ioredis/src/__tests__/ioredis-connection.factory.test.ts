import { createIORedisConnection } from '../ioredis-connection.factory';

describe('ioredis-connection.factory', () => {
  describe('createIORedisConnection', () => {
    describe('when dsn is invalid', () => {
      it('should throw a parse error', () => {
        expect(() => createIORedisConnection('invalid:/')).toThrow("Can't parse DSN, reason PARSE_ERROR");
      });
    });
    describe('when dsn is valid', () => {
      it('should create a lazy connection', async () => {
        const conn = createIORedisConnection('redis://localhost:65534');
        const status = conn.status;
        await conn.quit();
        expect(status).toStrictEqual('connecting');
      });
    });
  });
});
