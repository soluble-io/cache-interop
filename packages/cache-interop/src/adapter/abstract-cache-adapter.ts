import {
  CacheInterface,
  CacheKey,
  CacheValueProviderFn,
  GetOrSetOptions,
  SetOptions,
  TrueOrCacheException,
  TrueOrFalseOrUndefined,
} from '../cache.interface';
import { CacheItemInterface } from '../cache-item.interface';
import { executeValueProviderFn, isCacheValueProviderFn } from '../utils';
import { CacheItem } from '../cache-item';
import { CacheException } from '../exceptions';

export abstract class AbstractCacheAdapter<TBase = string> implements CacheInterface<TBase> {
  abstract set<T = TBase>(
    key: CacheKey,
    value: T | CacheValueProviderFn<T>,
    options?: SetOptions
  ): Promise<TrueOrCacheException>;
  abstract get<T = TBase>(key: CacheKey): Promise<CacheItemInterface<T>>;
  abstract has(key: CacheKey): Promise<TrueOrFalseOrUndefined>;

  abstract delete(key: CacheKey): Promise<TrueOrCacheException>;
  abstract getMultiple<T = TBase, K = Readonly<CacheKey[]>>(keys: K): Promise<Array<CacheItemInterface<T>>>;
  abstract deleteMultiple(keys: CacheKey[]): Promise<Map<CacheKey, TrueOrCacheException>>;

  setMultiple = async <T = TBase>(
    keyVals: Readonly<[key: CacheKey, value: T | CacheValueProviderFn<T>][]>
  ): Promise<Map<CacheKey, TrueOrCacheException>> => {
    const promises = keyVals.map(([key, value]) => {
      return this.set(key, value).then((resp) => [key, resp]);
    });
    const responses = (await Promise.all(promises)) as [CacheKey, TrueOrCacheException][];
    return new Map(responses);
  };

  abstract clear(): Promise<boolean>;

  abstract getStorage(): unknown;

  getOrSet = async <T = TBase>(
    key: CacheKey,
    value: T | CacheValueProviderFn<T>,
    options?: GetOrSetOptions
  ): Promise<CacheItemInterface<T>> => {
    const cacheItem = await this.get<T>(key);
    if (cacheItem.hit) {
      return cacheItem;
    }

    let v: T | CacheValueProviderFn<T>;
    let fetched = false;
    if (isCacheValueProviderFn(value)) {
      try {
        v = await executeValueProviderFn<T>(value);
        fetched = true;
      } catch (e) {
        return CacheItem.createFromError({
          key: key,
          error: new CacheException({
            message: 'Could not execute async function provider',
            previousError: e,
          }),
        });
      }
    } else {
      v = value;
    }
    const stored = await this.set(key, v, options);
    const { ttl = null } = options ?? {};
    return CacheItem.createFromHit({
      key: key,
      fetched: fetched,
      persisted: stored === true,
      value: v as T,
    });
  };
}
