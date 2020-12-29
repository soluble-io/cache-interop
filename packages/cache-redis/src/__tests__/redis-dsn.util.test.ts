import { getRedisOptionsFromDsn, getTlsOptions } from '../redis-dsn.util';

describe('redis-dsn utils', () => {
  describe('getTlsOptions', () => {
    it('should return null if not rediss', () => {
      expect(getTlsOptions('redis', 'localhost')).toBeNull();
    });
    it('should return tls without host for local hostnames', () => {
      expect(getTlsOptions('rediss', 'localhost')).toStrictEqual({});
    });
    it('should return tls with host for urls', () => {
      expect(getTlsOptions('rediss', 'example.com')).toStrictEqual({
        host: 'example.com',
      });
    });
  });

  describe('getRedisOptionsFromDsn', () => {
    describe('when is valid dsn is provided', () => {
      it('should return expected options', () => {
        const dsn = 'rediss://u:p@/word@www.example.com:6379/db1';
        expect(getRedisOptionsFromDsn(dsn)).toStrictEqual({
          db: 'db1',
          host: 'www.example.com',
          port: 6379,
          tls: {
            host: 'www.example.com',
          },
          username: 'u',
          auth_pass: 'p@/word',
        });
      });
      it('should not return undefined props', () => {
        const dsn = 'redis://localhost';
        expect(getRedisOptionsFromDsn(dsn)).toStrictEqual({
          host: 'localhost',
        });
      });
      it('should honour overrides', () => {
        const dsn = 'redis://localhost:6379';
        expect(getRedisOptionsFromDsn(dsn, { port: 2014 })).toStrictEqual({
          host: 'localhost',
          port: 2014,
        });
      });
    });

    describe('when dsn is not parsable', () => {
      it('should throw expected message', () => {
        const dsn = 'redis://';
        expect(() => getRedisOptionsFromDsn(dsn)).toThrow("Can't parse DSN, reason PARSE_ERROR");
      });
    });

    describe('when is an invalid dsn driver is provided', () => {
      it('should throw expected message', () => {
        const dsn = 'mysql://localhost';
        expect(() => getRedisOptionsFromDsn(dsn)).toThrow("Unsupported driver 'mysql', must be redis or rediss");
      });
    });
  });
});
