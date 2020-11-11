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

export abstract class AbstractCacheAdapter<TBase = string, KBase = CacheKey> implements CacheInterface<TBase, KBase> {
  abstract set<T = TBase, K extends KBase = KBase>(
    key: K,
    value: T | CacheValueProviderFn<T>,
    options?: SetOptions
  ): Promise<TrueOrCacheException>;
  abstract get<T = TBase, K extends KBase = KBase>(key: K): Promise<CacheItemInterface<T>>;
  abstract has<K extends KBase = KBase>(key: K): Promise<TrueOrFalseOrUndefined>;

  abstract delete<K extends KBase = KBase>(key: K): Promise<TrueOrCacheException>;
  abstract deleteMultiple<K extends KBase = KBase>(keys: K[]): Promise<Map<K, TrueOrCacheException>>;

  getMultiple = async <T = TBase, K extends KBase = KBase>(keys: K[]): Promise<Map<K, CacheItemInterface<T>>> => {
    const promises = keys.map((key) => {
      return this.get(key).then((item) => [key, item]);
    });
    //const responses = (await Promise.all(promises)) as [CacheKey, TrueOrCacheException][];

    return Promise.resolve(new Map([]));
  };

  setMultiple = async <T = TBase, K extends KBase = KBase>(
    keyVals: Readonly<[key: K, value: T | CacheValueProviderFn<T>][]>
  ): Promise<Map<K, TrueOrCacheException>> => {
    const promises = keyVals.map(([key, value]) => {
      return this.set(key, value).then((resp) => [key, resp]);
    });
    const responses = (await Promise.all(promises)) as [K, TrueOrCacheException][];
    return new Map(responses);
  };

  abstract clear(): Promise<boolean>;

  abstract getStorage(): unknown;

  getOrSet = async <T = TBase, K extends KBase = KBase>(
    key: K,
    value: T | CacheValueProviderFn<T>,
    options?: GetOrSetOptions
  ): Promise<CacheItemInterface<T>> => {
    const cacheItem = await this.get<T, K>(key);
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
        return CacheItem.createFromError<T, string>({
          key: typeof key === 'string' ? key : 'Unsupported Key',
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
    return CacheItem.createFromHit<T, string>({
      key: typeof key === 'string' ? key : 'Unsupported Key',
      fetched: fetched,
      persisted: stored === true,
      value: v as T,
    });
  };
}
