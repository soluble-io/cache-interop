import {
  createIoRedisNativeConnection,
  createIoRedisConnection,
} from '../ioredis-connection.factory';

describe('ioredis-connection.factory', () => {
  describe('createNativeConnection', () => {
    describe('when dsn is invalid', () => {
      it('should throw a parse error', () => {
        expect(() => createIoRedisNativeConnection('invalid:/')).toThrow(
          "Can't parse DSN, reason PARSE_ERROR"
        );
      });
    });
  });
  describe('createIORedisConnection', () => {
    describe('When conn is an invalid string', () => {
      it('should throw a parse error', () => {
        expect(() => createIoRedisConnection('invalid:/')).toThrow(
          "Can't parse DSN, reason PARSE_ERROR"
        );
      });
    });
  });
});
