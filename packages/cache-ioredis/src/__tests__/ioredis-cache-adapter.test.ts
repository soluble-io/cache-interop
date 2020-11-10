import { IoRedisCacheAdapter } from '../ioredis-cache-adapter';

describe('IoRedisCacheAdapter::getOptionsFromDSN', () => {
  describe('when a dsn is provided with user, pass, host, port and db', () => {
    it('should return options for dsn with password', () => {
      const dsn = 'redis://username:P/ASSWORD@www.example.com:6379/0';
      const options = IoRedisCacheAdapter.getOptionsFromDSN(dsn);
      expect(options).toStrictEqual({
        password: 'P/ASSWORD',
        host: 'www.example.com',
        username: 'username',
        port: 6379,
        db: 0,
      });
    });
  });
  describe('when a dsn is provided with pass, host and port', () => {
    it('should return options for dsn', () => {
      const dsn = 'redis://:P/ASSWORD@www.example.com:6379';
      const options = IoRedisCacheAdapter.getOptionsFromDSN(dsn);
      expect(options).toStrictEqual({
        password: 'P/ASSWORD',
        host: 'www.example.com',
        port: 6379,
      });
    });
  });
  describe('when a dsn is provided with just host and port', () => {
    it('should return options for just host and port', () => {
      const dsn = 'redis://www.example.com:6379';
      const options = IoRedisCacheAdapter.getOptionsFromDSN(dsn);
      expect(options).toStrictEqual({
        host: 'www.example.com',
        port: 6379,
      });
    });
  });
});
