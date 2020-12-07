import { CacheItemInterface } from './cache-item.interface';
import { CacheException, CacheProviderException, InvalidArgumentException } from './exceptions';

export type GetOptions<T> = {
  defaultValue?: T;
  disableCache?: boolean;
};

export type HasOptions = {
  /** Whether to disable caching, by default false */
  disableCache?: boolean;
};

export type SetOptions = {
  /** Time-To-Live expressed in seconds, 0 meaning forever  */
  ttl?: number;
  /** Whether to disable caching, by default false */
  disableCache?: boolean;
};
export type GetOrSetOptions = Omit<SetOptions, 'disableCache'> & {
  /** Whether to disable caching, by default false.
   *  Accepts an object to selectively disable writes and/or reads
   */
  disableCache:
    | boolean
    | {
        /** True to disable cache reads */
        read: boolean;
        /** True to disable cache writes */
        write: boolean;
      };
};

type CacheValueProviderParams = { key: CacheKey };
export type CacheProviderAsyncFn<T> = (params?: CacheValueProviderParams) => Promise<T>;
export type CacheProviderSyncFn<T> = (params?: CacheValueProviderParams) => T;
export type CacheValueProviderFn<T> = CacheProviderAsyncFn<T> | CacheProviderSyncFn<T>;

export type TrueOrFalseOrUndefined = true | false | undefined;

export type CacheKey = string;

export interface CacheInterface<TBase = string, KBase = CacheKey> {
  /**
   * Fetches a value from the cache
   *
   * @param key - The unique key of this item in the cache.
   * @param options - An object holding GetOptions
   *
   * @returns A promise returning a CacheItemInterface, or defaultValue in case of cache miss.
   * @throws InvalidArgumentException
   *         MUST be thrown if the $key string is not a legal value.
   */
  get<T = TBase, K extends KBase = KBase>(key: K, options?: GetOptions<T>): Promise<CacheItemInterface<T>>;

  /**
   * Persists data in the cache, uniquely referenced by a key.
   *
   * @param key - The key of the item to store.
   * @param value - The value of the item to store or a function returning the value. Must be serializable.
   * @param options - An object holding SetOptions
   *
   * @throws InvalidArgumentException
   *         MUST be thrown if the $key string is not a legal value.
   */
  set<T = TBase, K extends KBase = KBase>(
    key: K,
    value: T | CacheValueProviderFn<T>,
    options?: SetOptions
  ): Promise<boolean | CacheException>;

  /**
   * Delete an item from the cache by its unique key.
   *
   * @param key - The unique cache key of the item to delete.
   *
   * @return True if the item was successfully removed, false if it did not exists.
   *         CacheException if there was an error.
   *
   * @throws InvalidArgumentException
   *         MUST be thrown if the $key string is not a legal value.
   */
  delete<K extends KBase = KBase>(key: K): Promise<boolean | CacheException>;

  /**
   * Determines whether an item is present in the cache.
   *
   * NOTE: It is recommended that has() is only to be used for cache warming type purposes
   * and not to be used within your live applications operations for get/set, as this method
   * is subject to a race condition where your has() will return true and immediately after,
   * another script can remove it, making the state of your app out of date.
   *
   * @param key - The cache item key
   *
   * @return True if the item exists in the cache and was removed, false otherwise.
   *         Undefined is used to determine if the operation was successful.
   *         If cacheDisabled option is set to true, it will always return false.
   *
   * @throws InvalidArgumentException
   *         MUST be thrown if the $key string is not a legal value.
   */
  has<K extends KBase = KBase>(key: K, options?: HasOptions): Promise<TrueOrFalseOrUndefined>;

  /**
   * Obtains multiple cache items by their unique keys.
   *
   * @param keys - A list of keys that can obtained in a single operation.
   */
  getMultiple<T = TBase, K extends KBase = KBase>(
    keys: K[],
    options?: GetOptions<T>
  ): Promise<Map<K, CacheItemInterface<T>>>;

  /**
   * Persists a set of key => value pairs in the cache.
   *
   * @param keyVals - array of tuples container key and value
   */
  setMultiple<T = TBase, K extends KBase = KBase>(
    keyVals: Readonly<[K, T | CacheValueProviderFn<T>][]>,
    options?: SetOptions
  ): Promise<Map<K, boolean | CacheException>>;

  /**
   * Delete cache entries from multiple keys
   *
   * @param keys - A list of keys that should be deleted.
   */
  deleteMultiple<K extends KBase = KBase>(keys: K[]): Promise<Map<K, boolean | CacheException>>;

  /**
   * Delete the entire cache's keys.
   *
   * @return bool True on success and CacheException on failure.
   */
  clear(): Promise<true | CacheException>;

  getOrSet<T = TBase, K extends KBase = KBase>(
    key: K,
    value: T | CacheValueProviderFn<T>,
    options?: GetOrSetOptions
  ): Promise<CacheItemInterface<T>>;

  getStorage(): unknown;
}
