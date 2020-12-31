import {
  CacheInterface,
  CacheKey,
  CacheValueProviderFn,
  DeleteOptions,
  GetOptions,
  GetOrSetOptions,
  HasOptions,
  SetOptions,
} from '../cache.interface';
import { CacheItemInterface } from '../cache-item.interface';
import { executeValueProviderFn } from '../utils';
import { CacheException, CacheProviderException } from '../exceptions';
import { getGetOrSetCacheDisabledParams } from '../utils/cache-options-utils';
import { CacheItemFactory } from '../cache-item.factory';
import { Guards } from '../validation/guards';

const defaultGetOrSetOptions: GetOrSetOptions = {
  disableCache: {
    read: false,
    write: false,
  },
} as const;

export abstract class AbstractCacheAdapter<TBase = string, KBase extends CacheKey = CacheKey>
  implements CacheInterface<TBase, KBase> {
  abstract set<T = TBase, K extends KBase = KBase>(
    key: K,
    value: T | CacheValueProviderFn<T>,
    options?: SetOptions
  ): Promise<boolean | CacheException>;

  abstract get<T = TBase, K extends KBase = KBase>(key: K, options?: GetOptions<T>): Promise<CacheItemInterface<T>>;

  abstract has<K extends KBase = KBase>(key: K, options?: HasOptions): Promise<boolean | undefined>;

  abstract delete<K extends KBase = KBase>(key: K, options?: DeleteOptions): Promise<boolean | CacheException>;

  deleteMultiple = async <K extends KBase = KBase>(
    keys: K[],
    options?: DeleteOptions
  ): Promise<Map<K, boolean | CacheException>> => {
    const promises = keys.map((key) => {
      return this.delete(key, options).then((resp): [K, boolean | CacheException] => [key, resp]);
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

  getOrSet = async <T = TBase, K extends KBase = KBase>(
    key: K,
    value: T | CacheValueProviderFn<T>,
    options?: GetOrSetOptions
  ): Promise<CacheItemInterface<T>> => {
    const { disableCache = false, ...setOptions } = { ...defaultGetOrSetOptions, ...(options ?? {}) };
    const { read: disableRead, write: disableWrite } = getGetOrSetCacheDisabledParams(disableCache);
    const item = await this.get<T, K>(key, { disableCache: disableRead });
    if (item.data !== null || item.error instanceof CacheException) {
      return item;
    }

    let v: T | CacheValueProviderFn<T>;
    let fetched = false;
    if (Guards.isCacheValueProviderFn(value)) {
      try {
        v = await executeValueProviderFn<T>(value);
        fetched = true;
      } catch (e) {
        return CacheItemFactory.fromErr({
          key: key,
          error: new CacheProviderException({
            message: 'Could not execute async function provider',
            previousError: e,
          }),
        });
      }
    } else {
      v = value;
    }
    const stored = await this.set(key, v, { ...setOptions, disableCache: disableWrite });

    return CacheItemFactory.fromOk<T, K>({
      key: key,
      data: v,
      isHit: !fetched,
      isPersisted: stored instanceof CacheException ? false : stored,
    });
  };
}
