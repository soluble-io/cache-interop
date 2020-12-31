import { CacheInterface, CacheKey } from '../cache.interface';
import { isNonEmptyString } from '../utils';
import { ConnectedCacheInterface } from '../connection/connected-cache.interface';

type CacheOrConnectedCache = CacheInterface | ConnectedCacheInterface<unknown>;

export class Guards {
  static isValidCacheKey<K extends CacheKey = CacheKey>(key: unknown): key is K {
    return isNonEmptyString(key);
  }

  /**
   * Check whether a cache adapter implements ConnectedAdapterInterface
   * and has a getConnection() method
   */
  static isConnectedCache<T = unknown>(adapter: CacheOrConnectedCache): adapter is ConnectedCacheInterface<T> {
    return typeof ((adapter as unknown) as ConnectedCacheInterface<T>)?.getConnection === 'function';
  }
}
