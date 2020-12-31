import {
  CacheInterface,
  CacheKey,
  CacheValueProviderFn,
  GetOptions,
  SetOptions,
  HasOptions,
  DeleteOptions,
} from '../cache.interface';
import { AbstractCacheAdapter } from './abstract-cache-adapter';
import { CacheItemInterface } from '../cache-item.interface';
import { executeValueProviderFn } from '../utils/value-provider';
import { DateProvider } from '../expiry/date-provider.interface';
import { EsDateProvider } from '../expiry/es-date-provider';
import { CacheException, CacheProviderException, InvalidCacheKeyException } from '../exceptions';
import { EvictionPolicyInterface, ExpiresAtPolicy } from '../eviction';
import { CacheItemFactory } from '../cache-item.factory';
import { Guards } from '../validation/guards';

type Options = {
  evictionPolicy?: EvictionPolicyInterface;
};

const defaultOptions = {
  evictionPolicy: new ExpiresAtPolicy(),
};

export class MapCacheAdapter<TBase = string, KBase extends CacheKey = CacheKey>
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
    if (!Guards.isValidCacheKey(key)) {
      return CacheItemFactory.fromInvalidCacheKey(key);
    }

    const { defaultValue = null, disableCache = false } = options ?? {};
    if (disableCache) {
      return CacheItemFactory.fromOk<T | null>({
        key: key,
        data: defaultValue !== null ? defaultValue : null,
        isHit: false,
      });
    }
    const cached = this.map.get(key);
    const { expiresAt = null } = cached ?? {};
    const expired = expiresAt !== null ? this.evictionPolicy.isExpired(expiresAt) : false;

    if (cached !== undefined) {
      const { data } = cached;
      return CacheItemFactory.fromOk<T | null, K>({
        key,
        data: expired ? null : (data as T),
        isHit: !expired,
      });
    }
    return CacheItemFactory.fromCacheMiss<T, K>({
      key,
      defaultValue,
    });
  };

  set = async <T = TBase, K extends KBase = KBase>(
    key: K,
    value: T | CacheValueProviderFn<T>,
    options?: SetOptions
  ): Promise<boolean | CacheException> => {
    if (!Guards.isValidCacheKey(key)) {
      return new InvalidCacheKeyException({ key });
    }
    const { disableCache = false, ttl = 0 } = options ?? {};
    if (disableCache) {
      return false;
    }
    let v = value;
    if (Guards.isCacheValueProviderFn(value)) {
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
    const expiresAt = ttl === 0 ? 0 : this.dateProvider.getUnixTime() + ttl;
    this.map.set(key, { expiresAt, data: v as T });
    return true;
  };

  has = async <K extends KBase = KBase>(key: K, options?: HasOptions): Promise<boolean | undefined> => {
    if (!Guards.isValidCacheKey(key)) {
      options?.onError?.(new InvalidCacheKeyException({ key }));
      return undefined;
    }
    const { disableCache = false } = options ?? {};
    if (disableCache) {
      return false;
    }
    if (!this.map.has(key)) {
      return false;
    }
    const { expiresAt = 0 } = this.map.get(key) ?? {};
    return !this.evictionPolicy.isExpired(expiresAt);
  };

  delete = async <K extends KBase = KBase>(key: K, options?: DeleteOptions): Promise<boolean | CacheException> => {
    if (!Guards.isValidCacheKey(key)) {
      return new InvalidCacheKeyException({ key });
    }
    const { disableCache = false } = options ?? {};
    if (disableCache) {
      return false;
    }
    const exists = this.map.has(key) === true;
    this.map.delete(key);
    return exists;
  };

  clear = async (): Promise<true> => {
    this.map.clear();
    return true;
  };
}
