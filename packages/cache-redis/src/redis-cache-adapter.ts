import {
  CacheInterface,
  CacheKey,
  AbstractCacheAdapter,
  CacheItemInterface,
  CacheException,
  executeValueProviderFn,
  CacheValueProviderFn,
  SetOptions,
  TrueOrFalseOrUndefined,
  isCacheValueProviderFn,
  isNonEmptyString,
  CacheProviderException,
  UnexpectedErrorException,
  GetOptions,
  HasOptions,
  DeleteOptions,
  ConnectionInterface,
  ConnectedCacheInterface,
  CacheItemFactory,
  Guards,
  InvalidCacheKeyException,
} from '@soluble/cache-interop';
import {
  RedisClient,
  ClientOpts as RedisClientOptions,
  AbortError,
  AggregateError,
  ReplyError,
  RedisError,
} from 'redis';
import { RedisConnection } from './redis-connection';
import { createRedisConnection } from './redis-connection.factory';

type Options = {
  /** Existing connection, IoRedis options or a valid dsn */
  connection: RedisConnection | RedisClientOptions | string | RedisClient;
};

export class RedisCacheAdapter<TBase = string, KBase extends CacheKey = CacheKey>
  extends AbstractCacheAdapter<TBase, KBase>
  implements CacheInterface<TBase, KBase>, ConnectedCacheInterface<RedisClient> {
  private readonly redis: RedisClient;
  private conn: RedisConnection;

  /**
   * @throws Error if redis connection can't be created
   */
  constructor(options: Options) {
    super();
    const { connection } = options;
    this.conn = connection instanceof RedisConnection ? connection : createRedisConnection(connection);
    this.redis = this.conn.getNativeConnection();
  }

  get = async <T = TBase, K extends KBase = KBase>(key: K, options?: GetOptions<T>): Promise<CacheItemInterface<T>> => {
    if (!Guards.isValidCacheKey(key)) {
      return CacheItemFactory.fromInvalidCacheKey(key);
    }
    const { disableCache = false, defaultValue = null } = options ?? {};
    if (disableCache) {
      return CacheItemFactory.fromCacheMiss<T, K>({
        key,
        defaultValue,
      });
    }
    return new Promise((resolve) => {
      this.redis.get(key, (err, data) => {
        if (err !== null) {
          resolve(
            CacheItemFactory.fromErr<K>({
              key,
              error: new CacheException({
                previousError: err,
                message: `[RedisCacheAdapter.get()] Cache error: ${err.message}`,
              }),
            })
          );
        } else if (data === null) {
          resolve(
            CacheItemFactory.fromCacheMiss<T, K>({
              key,
              defaultValue,
            })
          );
        } else {
          resolve(
            CacheItemFactory.fromOk<T, K>({
              key,
              data: (data as unknown) as T,
              isHit: true,
            })
          );
        }
      });
    });
  };
  set = async <T = TBase, K extends KBase = KBase>(
    key: K,
    value: T | CacheValueProviderFn<T>,
    options?: SetOptions
  ): Promise<boolean | CacheException> => {
    if (!Guards.isValidCacheKey(key)) {
      return new InvalidCacheKeyException(key);
    }
    const { disableCache = false, ttl = 0 } = options ?? {};
    if (disableCache) {
      return false;
    }
    let v = value;
    if (isCacheValueProviderFn(value)) {
      try {
        v = await executeValueProviderFn<T>(value);
      } catch (e) {
        // @todo decide what to do, a cache miss ?
        return new CacheProviderException({
          previousError: e,
          message: "Can't fetch the provided function",
        });
      }
    }
    if (v === null) return true;

    return new Promise((resolve) => {
      // @todo decide what to do when value returned is not a string
      if (!isNonEmptyString(v)) {
        throw new Error('IORedisCacheAdapter currently support only string values');
      }
      if (!isNonEmptyString(key)) {
        throw new Error('IORedisCacheAdapter currently support only string keys');
      }
      const resolver = (err: RedisError | null, reply: unknown) => {
        if (err !== null) {
          resolve(
            new CacheException({
              message: '[RedisCacheAdapter.set()] Cannot write to cache',
              previousError: err,
            })
          );
        }
        resolve(true);
      };
      if (ttl > 0) {
        this.redis.setex(key, ttl, v, resolver);
      } else {
        this.redis.set(key, v, resolver);
      }
    });
  };

  has = async <K extends KBase = KBase>(key: K, options?: HasOptions): Promise<TrueOrFalseOrUndefined> => {
    if (!Guards.isValidCacheKey(key)) {
      if (options?.onError) {
        options.onError(new InvalidCacheKeyException(key));
      }
    }
    const { disableCache = false } = options ?? {};
    if (disableCache) {
      return false;
    }
    return new Promise((resolve) =>
      this.redis.exists(key, (err: RedisError | null, count) => {
        if (err !== null) {
          // @todo see how error can be logged or returned
          resolve(undefined);
        }
        resolve(count === 1);
      })
    );
  };

  delete = async <K extends KBase = KBase>(key: K, options?: DeleteOptions): Promise<boolean | CacheException> => {
    if (!Guards.isValidCacheKey(key)) {
      return new InvalidCacheKeyException(key);
    }
    const { disableCache = false } = options ?? {};
    if (disableCache) {
      return false;
    }

    return new Promise((resolve) => {
      this.redis.del(key, (cbError, cbCount) => {
        if (cbError !== null) {
          resolve(
            new CacheException({
              message: cbError.message,
              previousError: cbError,
            })
          );
        } else {
          resolve(cbCount === 1);
        }
      });
    });
  };

  clear = async (): Promise<true | CacheException> => {
    return new Promise((resolve) => {
      let response: true | CacheException | null = null;
      this.redis.flushdb((err, res) => {
        if (err !== null) {
          response = new CacheException({
            message: `Cannot clear cache: ${err.message}`,
            previousError: err,
          });
        } else if (res !== 'OK') {
          response = new UnexpectedErrorException({
            message: `Redis should return 'OK' if not error was set`,
          });
        } else {
          response = true;
        }
        resolve(
          response ??
            new UnexpectedErrorException({
              message: 'Redis.flushdb() should return a valid response',
            })
        );
      });
    });
  };

  getConnection(): ConnectionInterface<RedisClient> {
    return this.conn;
  }
}
