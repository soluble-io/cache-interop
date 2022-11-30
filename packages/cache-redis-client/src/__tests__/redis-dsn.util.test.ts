import type { RedisClientOptions } from '@redis/client';
import { getRedisOptionsFromDsn } from '../redis-dsn.util';

describe('redis-dsn utils', () => {
  describe('getRedisOptionsFromDsn', () => {
    describe('when is valid dsn is provided', () => {
      it('should return expected options', () => {
        const dsn = 'rediss://u:p@/word@www.example.com:6379/db1';
        expect(getRedisOptionsFromDsn(dsn)).toStrictEqual({
          database: 1,
          username: 'u',
          password: 'p@/word',
          socket: {
            port: 6379,
            tls: true,
            host: 'www.example.com',
          },
        } as RedisClientOptions);
      });
      it('should not return undefined props', () => {
        const dsn = 'redis://localhost';
        expect(getRedisOptionsFromDsn(dsn)).toStrictEqual({
          socket: {
            host: 'localhost',
          },
        } as RedisClientOptions);
      });
    });

    describe('when redisClient options are given', () => {
      it('should return custom redis client options', () => {
        const dsn = 'redis://localhost:6379';
        expect(getRedisOptionsFromDsn(dsn, {})).toStrictEqual({
          socket: {
            host: 'localhost',
            port: 6379,
          },
        } as RedisClientOptions);
      });

      it('should take precedence on dsnOverrides', () => {
        const dsn = 'redis://localhost:6379';
        expect(
          getRedisOptionsFromDsn(
            dsn,
            { socket: { port: 2015 } },
            { port: 2014 }
          )
        ).toStrictEqual({
          socket: {
            host: 'localhost',
            port: 2015,
          },
        } as RedisClientOptions);
      });
    });

    describe('when dsnOverrides are given', () => {
      it('should overwrite port when override say so', () => {
        const dsn = 'redis://localhost:6379';
        expect(
          getRedisOptionsFromDsn(dsn, undefined, { port: 2014 })
        ).toStrictEqual({
          socket: {
            host: 'localhost',
            port: 2014,
          },
        } as RedisClientOptions);
      });
    });

    describe('when dsn is not parsable', () => {
      it('should throw expected message', () => {
        const dsn = 'redis://';
        expect(() => getRedisOptionsFromDsn(dsn)).toThrow(
          "Can't parse DSN, reason PARSE_ERROR"
        );
      });
    });

    describe('when is an invalid dsn driver is provided', () => {
      it('should throw expected message', () => {
        const dsn = 'mysql://localhost';
        expect(() => getRedisOptionsFromDsn(dsn)).toThrow(
          "Unsupported driver 'mysql', must be redis or rediss"
        );
      });
    });
  });
});
