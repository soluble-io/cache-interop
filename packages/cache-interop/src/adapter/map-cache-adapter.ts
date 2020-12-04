import {
  CacheInterface,
  CacheKey,
  CacheValueProviderFn,
  GetOptions,
  SetOptions,
  TrueOrFalseOrUndefined,
} from '../cache.interface';
import { isCacheValueProviderFn } from '../utils/typeguards';
import { AbstractCacheAdapter } from './abstract-cache-adapter';
import { CacheItemInterface } from '../cache-item.interface';
import { CacheItem } from '../cache-item';
import { executeValueProviderFn } from '../utils/value-provider';
import { DateProvider } from '../expiry/date-provider.interface';
import { EsDateProvider } from '../expiry/es-date-provider';
import { CacheException, CacheProviderException } from '../exceptions';
import { EvictionPolicyInterface, ExpiresAtPolicy } from '../eviction';

type Options = {
  evictionPolicy?: EvictionPolicyInterface;
};

const defaultOptions = {
  evictionPolicy: new ExpiresAtPolicy(),
};

export class MapCacheAdapter<TBase = string, KBase = CacheKey>
  extends AbstractCacheAdapter<TBase, KBase>
  implements CacheInterface<TBase, KBase> {
  private map: Map<KBase, { expiresAt: number; data: unknown }>;
  private dateProvider: DateProvider;
  private evictionPolicy: EvictionPolicyInterface;
  constructor(options?: Options) {
    super();
    const { evictionPolicy } = { ...defaultOptions, ...(options ?? {}) };
    this.map = new Map();
    this.evictionPolicy = evictionPolicy;
    this.dateProvider = new EsDateProvider();
  }

  get = async <T = TBase, K extends KBase = KBase>(key: K, options?: GetOptions<T>): Promise<CacheItemInterface<T>> => {
    if (typeof key !== 'string') {
      // @todo remove this
      throw new Error('Error @todo check for possible values');
    }
    const { defaultValue = null } = options ?? {};
    const cached = this.map.get(key);
    const expired = cached?.expiresAt ? this.evictionPolicy.isExpired(cached.expiresAt) : false;

    if (cached !== undefined && !expired) {
      const { data } = cached;
      return CacheItem.createFromHit<T>({
        key,
        value: data as T,
      });
    } else if (defaultValue !== null) {
      return CacheItem.createFromHit<T>({
        key,
        value: defaultValue,
      });
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
    const { ttl = 0 } = options || {};
    const expiresAt = ttl === 0 ? 0 : this.dateProvider.getUnixTime() + ttl;
    this.map.set(key, { expiresAt, data: v as T });
    return true;
  };

  has = async <K extends KBase = KBase>(key: K): Promise<TrueOrFalseOrUndefined> => {
    if (!this.map.has(key)) {
      return false;
    }
    const { expiresAt = 0 } = this.map.get(key) ?? {};
    return !this.evictionPolicy.isExpired(expiresAt);
  };

  delete = async <K extends KBase = KBase>(key: K): Promise<boolean | CacheException> => {
    const exists = this.map.has(key) === true;
    this.map.delete(key);
    return exists;
  };

  clear = async (): Promise<true> => {
    this.map.clear();
    return true;
  };

  getStorage(): Map<KBase, { expiresAt: number; data: unknown }> {
    return this.map;
  }
}
