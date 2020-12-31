import {
  CacheInterface,
  CacheKey,
  AbstractCacheAdapter,
  CacheItemInterface,
  CacheException,
  executeValueProviderFn,
  CacheValueProviderFn,
  SetOptions,
  isCacheValueProviderFn,
  isNonEmptyString,
  CacheProviderException,
  UnexpectedErrorException,
  GetOptions,
  HasOptions,
  DeleteOptions,
  ConnectedCacheInterface,
  ConnectionInterface,
  CacheItemFactory,
  Guards,
  InvalidCacheKeyException,
} from '@soluble/cache-interop';
import IORedis from 'ioredis';
import { IoredisConnection } from './ioredis-connection';
import { createIoRedisConnection } from './ioredis-connection.factory';

type Options = {
  /** Existing connection, IoRedis options or a valid dsn */
  connection: IoredisConnection | IORedis.RedisOptions | string | IORedis.Redis;
};

export class IoRedisCacheAdapter<TBase = string, KBase extends CacheKey = CacheKey>
  extends AbstractCacheAdapter<TBase, KBase>
  implements CacheInterface<TBase, KBase>, ConnectedCacheInterface<IORedis.Redis> {
  private readonly conn: IoredisConnection;
  private readonly redis: IORedis.Redis;

  /**
   * @throws Error
   */
  constructor(options: Options) {
    super();
    const { connection } = options;
    this.conn = connection instanceof IoredisConnection ? connection : createIoRedisConnection(connection);
    this.redis = this.conn.getNativeConnection();
  }

  get = async <T = TBase, K extends KBase = KBase>(key: K, options?: GetOptions<T>): Promise<CacheItemInterface<T>> => {
    if (!Guards.isValidCacheKey(key)) {
      return CacheItemFactory.fromInvalidCacheKey(key);
    }

    const { defaultValue = null, disableCache = false } = options ?? {};
    if (disableCache) {
      return CacheItemFactory.fromCacheMiss<T, K>({
        key,
        defaultValue,
      });
    }
    let data: T;
    try {
      data = ((await this.redis.get(key)) as unknown) as T;
    } catch (e) {
      return CacheItemFactory.fromErr<K>({
        key,
        error: new CacheException({
          previousError: e,
          message: `[IoRedisCacheAdapter.get()] Cache error: ${e?.message}`,
        }),
      });
    }
    if (data === null) {
      return CacheItemFactory.fromCacheMiss<T, K>({
        key,
        defaultValue,
      });
    }
    return CacheItemFactory.fromOk<T, K>({
      key,
      data,
      isHit: true,
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
    const { ttl = 0, disableCache = false } = options ?? {};
    if (disableCache) {
      return false;
    }
    let v = value;
    if (isCacheValueProviderFn(value)) {
      try {
        v = await executeValueProviderFn<T>(value);
      } catch (e) {
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
      const resolver = (response: unknown) => {
        resolve(
          response !== null
            ? true
            : new CacheException({
                message: '[IoRedisCacheAdapter.set()] Cannot write to cache',
              })
        );
      };
      if (ttl > 0) {
        this.redis.setex(key, ttl, v).then(resolver);
      } else {
        this.redis.set(key, v).then(resolver);
      }
    });
  };

  has = async <K extends KBase = KBase>(key: K, options?: HasOptions): Promise<boolean | undefined> => {
    if (!Guards.isValidCacheKey(key)) {
      options?.onError?.(new InvalidCacheKeyException(key));
      return undefined;
    }
    const { disableCache = false } = options ?? {};
    if (disableCache) {
      return false;
    }
    return this.redis.exists(key).then((count) => count === 1);
  };

  delete = async <K extends KBase = KBase>(key: K, options?: DeleteOptions): Promise<boolean | CacheException> => {
    if (!Guards.isValidCacheKey(key)) {
      return new InvalidCacheKeyException(key);
    }
    const { disableCache = false } = options ?? {};
    if (disableCache) {
      return false;
    }
    let error: CacheException | null = null;
    let exists = false;
    const _ = await this.redis.del(key, (cbError, cbCount) => {
      if (cbError !== null) {
        error = new CacheException({
          message: cbError.message,
          previousError: cbError,
        });
      } else {
        exists = cbCount === 1;
      }
    });
    if (error !== null) {
      return error;
    }
    return exists;
  };

  clear = async (): Promise<true | CacheException> => {
    let response: true | CacheException | null = null;
    await this.redis.flushdb((err, res) => {
      if (err !== null) {
        response = new CacheException({
          message: `Cannot clear cache: ${err.message}`,
          previousError: err,
        });
      } else if (res !== 'OK') {
        response = new UnexpectedErrorException({
          message: `IoRedis should return 'OK' if not error was set`,
        });
      } else {
        response = true;
      }
    });
    return (
      response ??
      new UnexpectedErrorException({
        message: 'IoRedis.flushdb() should return a valid response',
      })
    );
  };

  getConnection(): ConnectionInterface<IORedis.Redis> {
    return this.conn;
  }
}
