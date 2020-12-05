import {
  CacheInterface,
  CacheKey,
  CacheValueProviderFn,
  GetOptions,
  GetOrSetOptions,
  SetOptions,
  TrueOrFalseOrUndefined,
} from '../cache.interface';
import { CacheItemInterface } from '../cache-item.interface';
import { executeValueProviderFn, isCacheValueProviderFn } from '../utils';
import { CacheItem } from '../cache-item';
import { CacheException } from '../exceptions';
import { getGetOrSetCacheDisabledParams } from '../utils/cache-options-utils';

const defaultGetOrSetOptions: GetOrSetOptions = {
  disableCache: {
    read: false,
    write: false,
  },
} as const;

export abstract class AbstractCacheAdapter<TBase = string, KBase = CacheKey> implements CacheInterface<TBase, KBase> {
  abstract set<T = TBase, K extends KBase = KBase>(
    key: K,
    value: T | CacheValueProviderFn<T>,
    options?: SetOptions
  ): Promise<boolean | CacheException>;
  abstract get<T = TBase, K extends KBase = KBase>(key: K, options?: GetOptions<T>): Promise<CacheItemInterface<T>>;
  abstract has<K extends KBase = KBase>(key: K): Promise<TrueOrFalseOrUndefined>;

  abstract delete<K extends KBase = KBase>(key: K): Promise<boolean | CacheException>;

  deleteMultiple = async <K extends KBase = KBase>(keys: K[]): Promise<Map<K, boolean | CacheException>> => {
    const promises = keys.map((key) => {
      return this.delete(key).then((resp): [K, boolean | CacheException] => [key, resp]);
    });
    return Promise.all(promises).then((resp) => new Map(resp));
  };

  getMultiple = async <T = TBase, K extends KBase = KBase>(
    keys: K[],
    options?: GetOptions<T>
  ): Promise<Map<K, CacheItemInterface<T>>> => {
    const promises = keys.map((key) => {
      return this.get<T>(key, options).then((item): [K, CacheItemInterface<T>] => [key, item]);
    });
    return Promise.all(promises).then((resp) => new Map(resp));
  };

  setMultiple = async <T = TBase, K extends KBase = KBase>(
    keyVals: Readonly<[K, T | CacheValueProviderFn<T>][]>,
    options?: SetOptions
  ): Promise<Map<K, boolean | CacheException>> => {
    const promises = keyVals.map(([key, value]) => {
      return this.set(key, value, options).then((resp) => [key, resp]);
    });
    const responses = (await Promise.all(promises)) as [K, boolean | CacheException][];
    return new Map(responses);
  };

  abstract clear(): Promise<true | CacheException>;

  abstract getStorage(): unknown;

  getOrSet = async <T = TBase, K extends KBase = KBase>(
    key: K,
    value: T | CacheValueProviderFn<T>,
    options?: GetOrSetOptions
  ): Promise<CacheItemInterface<T>> => {
    const { disableCache = false, ...setOptions } = { ...defaultGetOrSetOptions, ...(options ?? {}) };
    const { read: disableRead, write: disableWrite } = getGetOrSetCacheDisabledParams(disableCache);
    const cacheItem = await this.get<T, K>(key, { disableCache: disableRead });
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
    const stored = await this.set(key, v, { ...setOptions, disableCache: disableWrite });
    const { ttl = null } = options ?? {};
    return CacheItem.createFromHit<T, string>({
      key: typeof key === 'string' ? key : 'Unsupported Key',
      fetched: fetched,
      persisted: stored === true,
      value: v as T,
    });
  };
}
