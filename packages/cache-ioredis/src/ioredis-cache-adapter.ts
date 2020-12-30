import {
  CacheInterface,
  CacheKey,
  AbstractCacheAdapter,
  CacheItemInterface,
  CacheException,
  CacheItem,
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
  ConnectedAdapterInterface,
  ConnectionInterface,
} from '@soluble/cache-interop';
import IORedis from 'ioredis';
import { IoredisConnection } from './ioredis-connection';
import { createIoRedisConnection } from './ioredis-connection.factory';

type Options = {
  /** Existing connection, IoRedis options or a valid dsn */
  connection: IoredisConnection | IORedis.RedisOptions | string | IORedis.Redis;
};

export class IoRedisCacheAdapter<TBase = string, KBase = CacheKey>
  extends AbstractCacheAdapter<TBase, KBase>
  implements CacheInterface<TBase, KBase>, ConnectedAdapterInterface<IORedis.Redis> {
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
    if (typeof key !== 'string') {
      // @todo remove this
      throw new Error('Error @todo check for possible values');
    }
    const { defaultValue = null, disableCache = false } = options ?? {};
    if (disableCache) {
      return CacheItem.createFromMiss({
        key,
        value: defaultValue !== null ? defaultValue : undefined,
      });
    }
    let value: T;
    try {
      value = ((await this.redis.get(key)) as unknown) as T;
    } catch (e) {
      return CacheItem.createFromError<T>({
        key,
        error: new CacheException({
          previousError: e,
          message: '[IoRedisCacheAdapter.get()] Cannot get data from cache',
        }),
      });
    }
    if (value === null) {
      return CacheItem.createFromMiss<T>({
        key: key,
        value: defaultValue !== null ? defaultValue : undefined,
      });
    }
    return CacheItem.createFromHit<T>({
      key,
      value,
    });
  };
  set = async <T = TBase, K extends KBase = KBase>(
    key: K,
    value: T | CacheValueProviderFn<T>,
    options?: SetOptions
  ): Promise<boolean | CacheException> => {
    const { ttl = 0, disableCache = false } = options ?? {};
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

  has = async <K extends KBase = KBase>(key: K, options?: HasOptions): Promise<TrueOrFalseOrUndefined> => {
    if (!isNonEmptyString(key)) {
      throw new Error('IORedisCacheAdapter currently support only string keys');
    }
    const { disableCache = false } = options ?? {};
    if (disableCache) {
      return false;
    }
    return this.redis.exists(key).then((count) => count === 1);
  };

  delete = async <K extends KBase = KBase>(key: K, options?: DeleteOptions): Promise<boolean | CacheException> => {
    if (!isNonEmptyString(key)) {
      throw new Error('IORedisCacheAdapter currently support only string keys');
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
