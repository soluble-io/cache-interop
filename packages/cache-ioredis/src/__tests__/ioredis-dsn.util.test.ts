import {
  getIoRedisOptionsFromDsn,
  getDbIndex,
  getTlsOptions,
} from '../ioredis-dsn.util';

describe('ioredis-dsn utils', () => {
  describe('getDbIndex', () => {
    it('should cast db number to numeric', () => {
      expect(getDbIndex('1')).toStrictEqual(1);
    });
    it('should remove db prefix', () => {
      expect(getDbIndex('db1')).toStrictEqual(1);
    });
    it('should left untouched numeric index', () => {
      expect(getDbIndex(1)).toStrictEqual(1);
    });
    it('should return null if db index invalid', () => {
      expect(getDbIndex('a')).toBeNull();
      expect(getDbIndex('dba12')).toBeNull();
    });
    it('should return null if db index is undefined', () => {
      expect(getDbIndex(undefined)).toBeNull();
    });
  });

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

  describe('getIoRedisOptionsFromDsn', () => {
    describe('when is valid dsn is provided', () => {
      it('should return expected options', () => {
        const dsn = 'rediss://u:p@/word@www.example.com:6379/db1';
        expect(getIoRedisOptionsFromDsn(dsn)).toStrictEqual({
          db: 1,
          host: 'www.example.com',
          port: 6379,
          tls: {
            host: 'www.example.com',
          },
          username: 'u',
          password: 'p@/word',
        });
      });
      it('should not return undefined props', () => {
        const dsn = 'redis://localhost';
        expect(getIoRedisOptionsFromDsn(dsn)).toStrictEqual({
          host: 'localhost',
        });
      });
      it('should honour overrides', () => {
        const dsn = 'redis://localhost:6379';
        expect(getIoRedisOptionsFromDsn(dsn, { port: 2014 })).toStrictEqual({
          host: 'localhost',
          port: 2014,
        });
      });
    });

    describe('when redisClient options are given', () => {
      it('should return custom redis client options', () => {
        const dsn = 'redis://localhost:6379';
        expect(
          getIoRedisOptionsFromDsn(dsn, { connectTimeout: 1 })
        ).toStrictEqual({
          host: 'localhost',
          connectTimeout: 1,
          port: 6379,
        });
      });

      it('should take precedence on dsnOverrides', () => {
        const dsn = 'redis://localhost:6379';
        expect(
          getIoRedisOptionsFromDsn(dsn, { port: 2015 }, { port: 2014 })
        ).toStrictEqual({
          host: 'localhost',
          port: 2015,
        });
      });
    });

    describe('when dsnOverrides are given', () => {
      it('should overwrite port when override say so', () => {
        const dsn = 'redis://localhost:6379';
        expect(
          getIoRedisOptionsFromDsn(dsn, undefined, { port: 2014 })
        ).toStrictEqual({
          host: 'localhost',
          port: 2014,
        });
      });
    });

    describe('when dsn is not parsable', () => {
      it('should throw expected message', () => {
        const dsn = 'redis://';
        expect(() => getIoRedisOptionsFromDsn(dsn)).toThrow(
          "Can't parse DSN, reason PARSE_ERROR"
        );
      });
    });

    describe('when is an invalid dsn driver is provided', () => {
      it('should throw expected message', () => {
        const dsn = 'mysql://localhost';
        expect(() => getIoRedisOptionsFromDsn(dsn)).toThrow(
          "Unsupported driver 'mysql', must be redis or rediss"
        );
      });
    });
  });
});
