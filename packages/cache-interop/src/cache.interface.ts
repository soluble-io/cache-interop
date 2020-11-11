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

export interface CacheInterface<TBase = string, KBase = CacheKey> {
  get<T = TBase, K extends KBase = KBase>(key: K): Promise<CacheItemInterface<T>>;
  /**
   * @param key
   * @param value a (serializable) value or a function (sync, async, promise) returning the value.
   * @param options
   */
  set<T = TBase, K extends KBase = KBase>(
    key: K,
    value: T | CacheValueProviderFn<T>,
    options?: SetOptions
  ): Promise<TrueOrCacheException>;

  /**
   * @return True if the item was successfully removed. CacheException if there was an error.
   */
  delete<K extends KBase = KBase>(key: K): Promise<TrueOrCacheException>;

  /**
   * @return True if the item exists in the cache and was removed, false otherwise.
   *         Undefined is used to determine if the operation was successful
   */
  has<K extends KBase = KBase>(key: K): Promise<TrueOrFalseOrUndefined>;

  getMultiple<T = TBase, K extends KBase = KBase>(keys: K[]): Promise<Map<K, CacheItemInterface<T>>>;
  setMultiple<T = TBase, K extends KBase = KBase>(
    keyVals: Readonly<[key: K, value: T | CacheValueProviderFn<T>][]>
  ): Promise<Map<K, TrueOrCacheException>>;
  deleteMultiple<K extends KBase = KBase>(keys: K[]): Promise<Map<K, TrueOrCacheException>>;

  clear(): Promise<TrueOrFalseOrUndefined>;

  getOrSet<T = TBase, K extends KBase = KBase>(
    key: K,
    value: T | CacheValueProviderFn<T>,
    options?: GetOrSetOptions
  ): Promise<CacheItemInterface<T>>;

  getStorage();
}
