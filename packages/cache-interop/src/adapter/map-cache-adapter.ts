import { CacheInterface, CacheKey, CacheValueProviderFn, SetOptions, TrueOrFalseOrUndefined } from '../cache.interface';
import { isCacheValueProviderFn } from '../utils/typeguards';
import { AbstractCacheAdapter } from './abstract-cache-adapter';
import { CacheItemInterface } from '../cache-item.interface';
import { CacheItem } from '../cache-item';
import { executeValueProviderFn } from '../utils/value-provider';
import { DateProvider } from '../expiry/date-provider.interface';
import { EsDateProvider } from '../expiry/es-date-provider';
import { CacheException, CacheProviderException, UnsupportedFeatureException } from '../exceptions';

export class MapCacheAdapter<TBase = string, KBase = CacheKey>
  extends AbstractCacheAdapter<TBase, KBase>
  implements CacheInterface<TBase, KBase> {
  private map: Map<KBase, { expiresAt: number; data: unknown }>;
  private dateProvider: DateProvider;
  constructor() {
    super();
    this.map = new Map();
    this.dateProvider = new EsDateProvider();
  }

  get = async <T = TBase, K extends KBase = KBase>(key: K): Promise<CacheItemInterface<T>> => {
    if (typeof key !== 'string') {
      // @todo remove this
      throw new Error('Error @todo check for possible values');
    }
    if (this.map.has(key)) {
      const cached = this.map.get(key);
      if (cached !== undefined) {
        const { expiresAt, data } = cached;
        // @todo check for expiration date
        return CacheItem.createFromHit<T>({
          key,
          value: data as T,
        });
      }
    }
    return CacheItem.createFromMiss<T>({
      key: key,
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
        // @todo decide what do do, a cache miss ?
        return new CacheProviderException({
          previousError: e,
          message: "Can't fetch the provided function",
        });
      }
    }
    const expiresAt = this.dateProvider.getUnixTime() + (options?.ttl ?? 0);
    this.map.set(key, { expiresAt, data: v as T });
    return true;
  };

  has = async <K extends KBase = KBase>(key: K): Promise<TrueOrFalseOrUndefined> => {
    return this.map.has(key);
  };

  delete = async <K extends KBase = KBase>(key: K): Promise<number | CacheException> => {
    const count = this.map.has(key) === true ? 1 : 0;
    this.map.delete(key);
    return count;
  };

  clear = async (): Promise<boolean> => {
    this.map.clear();
    return true;
  };

  getStorage(): Map<KBase, { expiresAt: number; data: unknown }> {
    return this.map;
  }
}
