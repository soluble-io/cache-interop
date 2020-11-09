import {
  CacheInterface,
  CacheKey,
  CacheValueProviderFn,
  SetOptions,
  TrueOrCacheException,
  TrueOrFalseOrUndefined,
} from '../cache.interface';
import IORedis from 'ioredis';
import { isCacheValueProviderFn, isNonEmptyString } from '../utils/typeguards';
import { isParsableNumeric } from '../utils/typeguards';
import { AbstractCacheAdapter } from './abstract-cache-adapter';
import { CacheItemInterface } from '../cache-item.interface';
import { CacheException } from '../exceptions/cache.exception';
import { CacheItem } from '../cache-item';
import { executeValueProviderFn } from '../utils/value-provider';
import { UnsupportedFeatureException } from '../exceptions/unsupported-feature.exception';

export class IoRedisCacheAdapter<TBase = string> extends AbstractCacheAdapter<TBase> implements CacheInterface<TBase> {
  private redis: IORedis.Redis;

  public readonly db: number;

  constructor(options: IORedis.RedisOptions) {
    super();
    const { db = 0, ...rest } = options;
    this.db = db;
    this.redis = new IORedis({ db, ...rest });
  }

  get = async <T = TBase>(key: CacheKey): Promise<CacheItemInterface<T>> => {
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
        expiresAt: 0,
      });
    }
    return CacheItem.createFromHit<T>({
      key,
      value,
    });
  };
  set = async <T = TBase>(
    key: CacheKey,
    value: T | CacheValueProviderFn<T>,
    options?: SetOptions
  ): Promise<TrueOrCacheException> => {
    let v = value;
    if (isCacheValueProviderFn(value)) {
      try {
        v = await executeValueProviderFn<T>(value);
      } catch (e) {
        // @todo decide what to do, a cache miss ?
        return new CacheException({
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

  has = async (key: CacheKey): Promise<TrueOrFalseOrUndefined> => {
    let count = 0;
    try {
      count = await this.redis.exists(key);
    } catch (e) {
      return undefined;
    }
    return count === 1;
  };

  delete = async (key: CacheKey): Promise<TrueOrCacheException> => {
    throw new UnsupportedFeatureException({
      message: 'Not yet implemented',
    });
  };
  getMultiple = async <T = TBase, K = Readonly<CacheKey[]>>(keys: K): Promise<Array<CacheItemInterface<T>>> => {
    throw new UnsupportedFeatureException({
      message: 'Not yet implemented',
    });
  };
  setMultiple = async <T = TBase>(keys: Map<CacheKey, T>): Promise<Map<CacheKey, TrueOrCacheException>> => {
    throw new UnsupportedFeatureException({
      message: 'Not yet implemented',
    });
  };
  deleteMultiple = async (keys: CacheKey[]): Promise<Map<CacheKey, TrueOrCacheException>> => {
    throw new UnsupportedFeatureException({
      message: 'Not yet implemented',
    });
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
