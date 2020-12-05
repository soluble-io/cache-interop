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
} from '@soluble/cache-interop';
import { RedisClient, createClient, ClientOpts, AbortError, AggregateError, ReplyError, RedisError } from 'redis';

export class RedisCacheAdapter<TBase = string, KBase = CacheKey>
  extends AbstractCacheAdapter<TBase, KBase>
  implements CacheInterface<TBase, KBase> {
  private readonly redis: RedisClient;

  public readonly db: number | string;

  constructor(options: ClientOpts) {
    super();
    const { db = 0, ...rest } = options;
    this.db = db;
    this.redis = createClient({ db, ...rest });
  }

  get = async <T = TBase, K extends KBase = KBase>(key: K, options?: GetOptions<T>): Promise<CacheItemInterface<T>> => {
    if (typeof key !== 'string') {
      // @todo remove this
      throw new Error('Error @todo check for possible values');
    }
    const { disableCache = false, defaultValue = null } = options ?? {};
    if (disableCache) {
      return CacheItem.createFromMiss<T>({
        key: key,
        value: defaultValue !== null ? defaultValue : undefined,
      });
    }
    return new Promise((resolve) => {
      this.redis.get(key, (err, value) => {
        if (err !== null) {
          resolve(
            CacheItem.createFromError<T>({
              key,
              error: new CacheException({
                previousError: err,
                message: '[RedisCacheAdapter.get()] Cannot get data from cache',
              }),
            })
          );
        } else if (value === null) {
          resolve(
            CacheItem.createFromMiss<T>({
              key,
              value: defaultValue !== null ? defaultValue : undefined,
            })
          );
        } else {
          resolve(
            CacheItem.createFromHit<T>({
              key,
              value: (value as unknown) as T,
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

  has = async <K extends KBase = KBase>(key: K): Promise<TrueOrFalseOrUndefined> => {
    if (!isNonEmptyString(key)) {
      throw new Error('RedisCacheAdapter currently support only string keys');
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

  delete = async <K extends KBase = KBase>(key: K): Promise<boolean | CacheException> => {
    if (!isNonEmptyString(key)) {
      throw new Error('RedisCacheAdapter currently support only string keys');
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

  getStorage(): RedisClient {
    return this.redis;
  }
}
