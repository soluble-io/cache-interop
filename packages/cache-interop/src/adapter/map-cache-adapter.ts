import {
  CacheInterface,
  CacheKey,
  CacheValueProviderFn,
  SetOptions,
  TrueOrCacheException,
  TrueOrFalseOrUndefined,
} from '../cache.interface';
import { isCacheValueProviderFn } from '../utils/typeguards';
import { AbstractCacheAdapter } from './abstract-cache-adapter';
import { CacheItemInterface } from '../cache-item.interface';
import { CacheItem } from '../cache-item';
import { executeValueProviderFn } from '../utils/value-provider';
import { UnsupportedFeatureException } from '../exceptions/unsupported-feature.exception';
import { DateProvider } from '../expiry/date-provider.interface';
import { EsDateProvider } from '../expiry/es-date-provider';
import { CacheException } from '../exceptions/cache.exception';

export class MapCacheAdapter<TBase = string> extends AbstractCacheAdapter<TBase> implements CacheInterface<TBase> {
  private map: Map<CacheKey, { expiresAt: number; data: unknown }>;
  private dateProvider: DateProvider;
  constructor() {
    super();
    this.map = new Map();
    this.dateProvider = new EsDateProvider();
  }

  get = async <T = TBase>(key: CacheKey): Promise<CacheItemInterface<T>> => {
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
        // @todo decide what do do, a cache miss ?
        return new CacheException({
          previousError: e,
          message: "Can't fetch the provided function",
        });
      }
    }
    const expiresAt = this.dateProvider.getUnixTime() + (options?.ttl ?? 0);
    this.map.set(key, { expiresAt, data: v as T });
    return true;
  };

  has = async (key: CacheKey): Promise<TrueOrFalseOrUndefined> => {
    return this.map.has(key);
  };

  delete = async (key: CacheKey): Promise<TrueOrCacheException> => {
    // @todo decide to return false when the item does no exists
    this.map.delete(key);
    return true;
  };

  clear = async (): Promise<boolean> => {
    this.map.clear();
    return true;
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
  getStorage(): Map<CacheKey, { expiresAt: number; data: unknown }> {
    return this.map;
  }
}
