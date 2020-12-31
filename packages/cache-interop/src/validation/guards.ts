import { CacheInterface, CacheKey, CacheValueProviderFn } from '../cache.interface';
import { isAsyncFn, isPromiseLike, isSyncFn } from '../utils';
import { ConnectedCacheInterface } from '../connection/connected-cache.interface';
import { CacheException } from '../exceptions';

type CacheOrConnectedCache = CacheInterface | ConnectedCacheInterface<unknown>;

// @todo find a way string | Buffer | number | any[]
type ValidRedisValue = string | number;

export class Guards {
  static isValidCacheKey<K extends CacheKey = CacheKey>(key: unknown): key is K {
    return Guards.isNonEmptyString(key);
  }

  /**
   * Check whether a cache adapter implements ConnectedAdapterInterface
   * and has a getConnection() method
   */
  static isConnectedCache<T = unknown>(adapter: CacheOrConnectedCache): adapter is ConnectedCacheInterface<T> {
    return typeof ((adapter as unknown) as ConnectedCacheInterface<T>)?.getConnection === 'function';
  }

  static isCacheException(val: unknown): val is CacheException {
    return val instanceof CacheException;
  }

  static isCacheValueProviderFn<T>(fn: unknown): fn is CacheValueProviderFn<T> {
    return isAsyncFn(fn) || isSyncFn(fn) || isPromiseLike(fn);
  }

  static isValidRedisValue(value: unknown): value is ValidRedisValue {
    return ['string', 'number'].includes(typeof value) && !Number.isNaN(value);
  }

  static isNonEmptyString(value: unknown, trim = true): value is string {
    return typeof value === 'string' && (trim ? value.trim() : value).length > 0;
  }
}
