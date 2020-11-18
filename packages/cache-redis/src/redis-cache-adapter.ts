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
  isParsableNumeric,
  CacheProviderException,
  UnexpectedErrorException,
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

  get = async <T = TBase, K extends KBase = KBase>(key: K, defaultValue?: T): Promise<CacheItemInterface<T>> => {
    let value: T;
    if (typeof key !== 'string') {
      // @todo remove this
      throw new Error('Error @todo check for possible values');
    }
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
      if (defaultValue !== undefined) {
        return CacheItem.createFromHit<T>({
          key,
          value: defaultValue,
        });
      }
      return CacheItem.createFromMiss<T>({
        key: key,
        expiresAt: 0,
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
  ): Promise<true | CacheException> => {
    const { ttl = 0 } = options ?? {};
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
      throw new Error('IORedisCacheAdapter currently support only string keys');
    }
    return this.redis.exists(key, (err: RedisError | null, count) => {
      if (err !== null) {
        // @todo see how error can be logged or returned
        return undefined;
      }
      return count === 1;
    });
  };

  delete = async <K extends KBase = KBase>(key: K): Promise<boolean | CacheException> => {
    if (!isNonEmptyString(key)) {
      throw new Error('IORedisCacheAdapter currently support only string keys');
    }
    let error: CacheException | null = null;
    let exists = false;
    const _ = this.redis.del(key, (cbError, cbCount) => {
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

  getStorage(): RedisClient {
    return this.redis;
  }
}
