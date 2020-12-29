import {
  CacheInterface,
  CacheKey,
  CacheValueProviderFn,
  GetOptions,
  SetOptions,
  HasOptions,
  TrueOrFalseOrUndefined,
  DeleteOptions,
} from '../cache.interface';
import { isCacheValueProviderFn, isNonEmptyString } from '../utils/typeguards';
import { AbstractCacheAdapter } from './abstract-cache-adapter';
import { CacheItemInterface } from '../cache-item.interface';
import { CacheItem } from '../cache-item';
import { executeValueProviderFn } from '../utils/value-provider';
import { DateProvider } from '../expiry/date-provider.interface';
import { EsDateProvider } from '../expiry/es-date-provider';
import { CacheException, CacheProviderException } from '../exceptions';
import { EvictionPolicyInterface, ExpiresAtPolicy } from '../eviction';
import { ConnectionInterface } from '../connection/connection.interface';
import { NullConnection } from '../connection/null-connection';

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
  private conn: NullConnection;
  constructor(options?: Options) {
    super();
    const { evictionPolicy } = { ...defaultOptions, ...(options ?? {}) };
    this.map = new Map();
    this.conn = new NullConnection();
    this.evictionPolicy = evictionPolicy;
    this.dateProvider = new EsDateProvider();
  }

  get = async <T = TBase, K extends KBase = KBase>(key: K, options?: GetOptions<T>): Promise<CacheItemInterface<T>> => {
    if (typeof key !== 'string') {
      // @todo remove this
      throw new Error('Error @todo check for possible values');
    }
    const { defaultValue = null, disableCache = false } = options ?? {};
    if (disableCache) {
      return CacheItem.createFromMiss({
        key,
        value: defaultValue !== null ? defaultValue : undefined,
      });
    }
    const cached = this.map.get(key);
    const { expiresAt = null } = cached ?? {};
    const expired = expiresAt !== null ? this.evictionPolicy.isExpired(expiresAt) : false;

    if (cached !== undefined && !expired) {
      const { data } = cached;
      return CacheItem.createFromHit<T>({
        key,
        value: data as T,
      });
    }
    return CacheItem.createFromMiss<T>({
      key: key,
      value: defaultValue !== null ? defaultValue : undefined,
    });
  };

  set = async <T = TBase, K extends KBase = KBase>(
    key: K,
    value: T | CacheValueProviderFn<T>,
    options?: SetOptions
  ): Promise<boolean | CacheException> => {
    const { disableCache = false, ttl = 0 } = options ?? {};
    if (disableCache) {
      return false;
    }
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
    const expiresAt = ttl === 0 ? 0 : this.dateProvider.getUnixTime() + ttl;
    this.map.set(key, { expiresAt, data: v as T });
    return true;
  };

  has = async <K extends KBase = KBase>(key: K, options?: HasOptions): Promise<TrueOrFalseOrUndefined> => {
    if (!isNonEmptyString(key)) {
      throw new Error('MapCacheAdapter currently support only string keys');
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
    if (!isNonEmptyString(key)) {
      throw new Error('MapCacheAdapter currently support only string keys');
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

  getConnection(): ConnectionInterface<null> {
    return this.conn;
  }
}
