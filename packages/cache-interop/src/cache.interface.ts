import { CacheItemInterface } from './cache-item.interface';
import { CacheException } from './exceptions/cache.exception';

export type SetOptions = {
  ttl?: number;
};
export type GetOrSetOptions = SetOptions; // &{}

type CacheValueProviderParams = { key: CacheKey };
export type CacheProviderAsyncFn<T> = (params?: CacheValueProviderParams) => Promise<T>;
export type CacheProviderSyncFn<T> = (params?: CacheValueProviderParams) => T;
export type CacheValueProviderFn<T> = CacheProviderAsyncFn<T> | CacheProviderSyncFn<T>;

export type TrueOrCacheException = true | CacheException;
export type TrueOrFalseOrUndefined = true | false | undefined;

export type CacheKey = string;

export interface CacheInterface<TBase = string> {
  get<T = TBase>(key: CacheKey): Promise<CacheItemInterface<T>>;

  /**
   * @param key
   * @param value a (serializable) value or a function (sync, async, promise) returning the value.
   * @param options
   */
  set<T = TBase>(
    key: CacheKey,
    value: T | CacheValueProviderFn<T>,
    options?: SetOptions
  ): Promise<TrueOrCacheException>;

  /**
   * @return True if the item was successfully removed. CacheException if there was an error.
   */
  delete(key: CacheKey): Promise<TrueOrCacheException>;

  /**
   * @return True if the item exists in the cache and was removed, false otherwise.
   *         When undefined is returned
   */
  has(key: CacheKey): Promise<TrueOrFalseOrUndefined>;

  getMultiple<T = TBase, K = Readonly<CacheKey[]>>(keys: K): Promise<Array<CacheItemInterface<T>>>;
  setMultiple<T = TBase>(keys: Map<CacheKey, T>): Promise<Map<CacheKey, TrueOrCacheException>>;
  deleteMultiple(keys: CacheKey[]): Promise<Map<CacheKey, TrueOrCacheException>>;
  getOrSet<T = TBase>(
    key: CacheKey,
    value: T | CacheValueProviderFn<T>,
    options?: GetOrSetOptions
  ): Promise<CacheItemInterface<T>>;
}
