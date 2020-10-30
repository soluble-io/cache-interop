import { IoRedisCacheAdapter } from '../ioredis-cache-adapter';

describe('IoRedisCacheAdapter', () => {
  describe('getOptionsFromDSN', () => {
    it('should parse a valid dsn', () => {
      const dsn = 'redis://:P/ASSWORD@www.example.com:6379/0';
      const options = IoRedisCacheAdapter.getOptionsFromDSN(dsn);
      expect(options).toStrictEqual({
        password: 'P/ASSWORD',
        host: 'www.example.com',
        port: 6379,
        db: 0,
      });
    });
  });
});
