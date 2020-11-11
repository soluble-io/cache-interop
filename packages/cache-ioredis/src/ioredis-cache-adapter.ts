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
} from '@soluble/cache-interop';
import IORedis from 'ioredis';

export class IoRedisCacheAdapter<TBase = string, KBase = CacheKey>
  extends AbstractCacheAdapter<TBase, KBase>
  implements CacheInterface<TBase, KBase> {
  private readonly redis: IORedis.Redis;

  public readonly db: number;

  constructor(options: IORedis.RedisOptions) {
    super();
    const { db = 0, ...rest } = options;
    this.db = db;
    this.redis = new IORedis({ db, ...rest });
  }

  get = async <T = TBase, K extends KBase = KBase>(key: K): Promise<CacheItemInterface<T>> => {
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
    return new Promise((resolve, reject) => {
      if (v === null) {
        resolve(true);
      }
      if (!isNonEmptyString(v)) {
        throw new Error('IORedisCacheAdapter currently support only string values');
      }
      if (!isNonEmptyString(key)) {
        throw new Error('IORedisCacheAdapter currently support only string keys');
      }
      this.redis.set(key, v).then((response) => {
        resolve(
          response !== null
            ? true
            : new CacheException({
                message: '[IoRedisCacheAdapter.set()] Cannot write to cache',
              })
        );
      });
    });
  };

  has = async <K extends KBase = KBase>(key: K): Promise<TrueOrFalseOrUndefined> => {
    let count = 0;
    try {
      if (!isNonEmptyString(key)) {
        throw new Error('IORedisCacheAdapter currently support only string keys');
      }
      count = await this.redis.exists(key);
    } catch (e) {
      return undefined;
    }
    return count === 1;
  };

  delete = async <K extends KBase = KBase>(key: K): Promise<number | CacheException> => {
    if (!isNonEmptyString(key)) {
      throw new Error('IORedisCacheAdapter currently support only string keys');
    }
    let error: CacheException | null = null;
    let count = 0;
    const _ = await this.redis.del(key, (cbError, cbCount) => {
      if (cbError !== null) {
        error = new CacheException({
          message: cbError.message,
          previousError: cbError,
        });
      } else {
        count = cbCount;
      }
    });
    if (error !== null) {
      return error;
    }
    return count;
  };

  clear = async (): Promise<boolean> => {
    const ret = await this.redis.flushdb();
    return ret === 'OK';
  };

  getStorage(): IORedis.Redis {
    return this.redis;
  }

  static createFromDSN(dsn: string): IoRedisCacheAdapter {
    return new IoRedisCacheAdapter<string>(IoRedisCacheAdapter.getOptionsFromDSN(dsn));
  }

  /**
   * Cause the ioredis one is buggy... with some characters
   */
  static getOptionsFromDSN(dsn: string): IORedis.RedisOptions {
    const regexp = /^redis:\/\/((?<username>.*)?:(?<password>.*)@)?(?<host>.*):(?<port>[0-9]{2,5})(\/(?<db>\d))?$/;
    const matches = dsn.match(regexp);
    if (matches === null || matches.length < 2 || !matches.groups) {
      throw new Error('Invalid IORedis DSN');
    }
    const options: Record<string, number | string> = {};
    for (const [key, value] of Object.entries(matches.groups)) {
      if (value) {
        options[key] = isParsableNumeric(value) ? Number.parseInt(value, 10) : value;
      }
    }
    return options;
  }
}
